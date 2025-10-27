"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma/index.js");
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
const minio_service_1 = require("../minio/minio.service");
let CourseService = class CourseService {
    prisma;
    minioService;
    elastic;
    constructor(prisma, minioService, elastic) {
        this.prisma = prisma;
        this.minioService = minioService;
        this.elastic = elastic;
    }
    async indexCourse(course) {
        await this.elastic.index('courses', course.id, course);
    }
    async searchCourses(keyword) {
        const courseInElas = await this.elastic.search('courses', {
            multi_match: {
                query: keyword,
                fields: ['title', 'description', 'instructorName'],
                fuzziness: 'AUTO',
            },
        });
        if (!courseInElas || courseInElas.length <= 0) {
            const courseInDb = await this.prisma.course.findMany();
            console.log(courseInDb);
            if (courseInDb) {
                this.indexCourse(courseInDb);
            }
            return courseInDb;
        }
        return {
            success: false,
            data: null,
        };
    }
    async getAllCourses(limit) {
        try {
            const safeLimit = Number(limit) || 0;
            const courses = await this.prisma.$queryRawUnsafe(`
      SELECT 
        c.id,
        c.title,
        c.price,
        c.thumbnailUrl,
        c.status,
        cr.name AS category,
        COUNT(DISTINCT e.id) AS students,
        COALESCE(AVG(r.rating), 0) AS avgRating
      FROM courses c
      JOIN users u ON u.id = c.instructorId
      LEFT JOIN categories cr ON cr.id = c.categoryId
      LEFT JOIN enrollments e ON e.courseId = c.id
      LEFT JOIN reviews r ON r.courseId = c.id
      GROUP BY c.id
      ORDER BY c.id
      ${safeLimit > 0 ? `LIMIT ${safeLimit}` : ''};
    `);
            if (!courses || courses.length === 0) {
                throw new common_1.HttpException('No courses found', 404);
            }
            return courses.map((c) => ({
                ...c,
                students: Number(c.students),
                avgRating: Number(c.avgRating) === 0 ? 5 : Number(c.avgRating),
            }));
        }
        catch (error) {
            console.error('error::::', error);
            throw new common_1.HttpException('Failed to fetch courses', 500);
        }
    }
    async getReview(courseId) {
        const reviews = await this.prisma.review.findMany({
            where: {
                courseId: courseId,
            },
            include: {
                user: { select: { full_name: true } },
            },
        });
        return reviews;
    }
    async getCourseDetail(courseId, userId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            include: {
                instructor: { select: { full_name: true } },
                category: { select: { id: true, name: true } },
                requirements: { select: { text: true } },
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                        user: { select: { full_name: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                enrollments: { select: { userId: true } },
                sessions: {
                    include: {
                        lessons: {
                            select: {
                                id: true,
                                title: true,
                                duration: true,
                                videoUrl: true,
                                docUrl: true,
                                position: true,
                            },
                            orderBy: { position: 'asc' },
                        },
                    },
                    orderBy: { position: 'asc' },
                },
            },
        });
        if (!course)
            throw new common_1.HttpException('Course not found', 404);
        const avgRating = course.reviews.length > 0
            ? course.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                course.reviews.length
            : 0;
        const totalDuration = course.sessions.reduce((acc, session) => {
            const lessonSum = session.lessons.reduce((sum, l) => sum + (l.duration || 0), 0);
            return acc + lessonSum;
        }, 0);
        const studentCount = course.enrollments.length;
        const isEnrolled = userId === undefined
            ? false
            : course.enrollments.some((e) => e.userId === userId);
        return {
            id: course.id,
            title: course.title,
            description: course.description,
            instructorName: course.instructor.full_name,
            thumbnailUrl: course.thumbnailUrl,
            videoUrl: course.videoUrl,
            price: course.price,
            requirements: course.requirements.map((r) => r.text),
            avgRating: Number(avgRating.toFixed(1)),
            studentCount,
            totalDuration,
            sessions: course.sessions.map((s) => ({
                id: s.id,
                title: s.title,
                position: s.position,
                lessons: s.lessons.map((l) => ({
                    id: l.id,
                    title: l.title,
                    duration: l.duration || 0,
                    videoUrl: l.videoUrl,
                    docUrl: l.docUrl,
                    position: l.position,
                })),
            })),
            isEnrolled,
            reviews: course.reviews.map((r) => ({
                rating: r.rating,
                comment: r.comment,
                createdAt: r.createdAt.toISOString(),
                user: { full_name: r.user.full_name },
            })),
            category: course.category
                ? { id: course.category.id, name: course.category.name }
                : null,
            createdAt: course.createdAt.toISOString(),
        };
    }
    async getCourseForWatch(courseId, userId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: {
                id: true,
                title: true,
                description: true,
                sessions: {
                    orderBy: { position: 'asc' },
                    select: {
                        id: true,
                        title: true,
                        position: true,
                        lessons: {
                            orderBy: { position: 'asc' },
                            select: {
                                id: true,
                                title: true,
                                videoUrl: true,
                                docUrl: true,
                                lessionStatus: true,
                                duration: true,
                                position: true,
                            },
                        },
                    },
                },
            },
        });
        if (!course)
            return null;
        const enrollment = await this.prisma.enrollment.findFirst({
            where: {
                userId,
                courseId,
            },
        });
        const isEnrolled = !!enrollment;
        if (!isEnrolled) {
            return {
                ...course,
                isEnrolled: false,
                message: 'User chưa đăng ký khóa học này.',
            };
        }
        const note = await this.prisma.courseNote.findFirst({
            where: { userId, courseId },
            select: { id: true, note: true, createdAt: true },
        });
        const progress = await this.prisma.courseProgress.findFirst({
            where: { userId, courseId },
            select: {
                id: true,
                progressPercentage: true,
                lastLessonId: true,
                updatedAt: true,
            },
        });
        return {
            id: course.id,
            title: course.title,
            description: course.description,
            sessions: course.sessions.map((s) => ({
                id: s.id,
                title: s.title,
                position: s.position,
                lessons: s.lessons.map((l) => ({
                    id: l.id,
                    title: l.title,
                    videoUrl: l.videoUrl,
                    docUrl: l.docUrl,
                    lessionStatus: l.lessionStatus,
                    duration: l.duration,
                    position: l.position,
                })),
            })),
            isEnrolled: true,
            note: note || null,
            progress: progress
                ? {
                    progressPercentage: Number(progress.progressPercentage),
                    lastLessonId: progress.lastLessonId,
                    updatedAt: progress.updatedAt,
                }
                : { progressPercentage: 0, lastLessonId: null },
        };
    }
    async getAllCategories() {
        const categories = await this.prisma.category.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return categories;
    }
    async getCourseForEdit(courseId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            include: {
                category: true,
                requirements: true,
                sessions: {
                    include: {
                        lessons: true,
                    },
                    orderBy: {
                        position: 'asc',
                    },
                },
            },
        });
        if (!course) {
            throw new common_1.HttpException('Course not found', 404);
        }
        const result = {
            id: course.id,
            title: course.title || '',
            description: course.description || '',
            price: course.price || 0,
            thumbnailUrl: course.thumbnailUrl || '',
            videoUrl: course.videoUrl || '',
            requirements: course.requirements.map((r) => r.text),
            sessions: course.sessions.map((s) => ({
                id: s.id,
                title: s.title,
                position: s.position,
                lessons: s.lessons.map((l) => ({
                    id: l.id,
                    title: l.title,
                    doc_url: l.docUrl || '',
                    video_url: l.videoUrl || '',
                    position: l.position,
                })),
            })),
            status: course.status,
            category: {
                id: course.category?.id ?? '',
                name: course.category?.name ?? '',
            },
        };
        return result;
    }
    attachFilesToMeta(meta, uploadedUrls) {
        const clone = structuredClone(meta);
        uploadedUrls.forEach(({ field, url }) => {
            const match = field.match(/^sessions\[(\d+)\]\[lessons\]\[(\d+)\]\[(video|doc)\]$/);
            if (match) {
                const [_, i, j, type] = match.map((x) => Number.isNaN(Number(x)) ? x : Number(x));
                clone.sessions = clone.sessions || [];
                clone.sessions[i] = clone.sessions[i] || { lessons: [] };
                clone.sessions[i].lessons = clone.sessions[i].lessons || [];
                clone.sessions[i].lessons[j] = clone.sessions[i].lessons[j] || {};
                clone.sessions[i].lessons[j][`${type}_url`] = url;
            }
            else if (field === 'videoUrl') {
                clone.videoUrl = url;
            }
            else if (field === 'thumbnailUrl') {
                clone.thumbnailUrl = url;
            }
        });
        return clone;
    }
    async createCourse(files, meta) {
        const uploadedUrls = await Promise.all(files.map(async (file) => {
            const objectName = await this.minioService.uploadFile('course-files', file);
            const url = await this.minioService.getPresignedUrl('course-files', objectName, 3600 * 24 * 7);
            return { field: file.fieldname, url };
        }));
        const updatedMeta = this.attachFilesToMeta(meta, uploadedUrls);
        const course = await this.prisma.course.create({
            data: {
                title: updatedMeta.title,
                description: updatedMeta.description,
                categoryId: updatedMeta.category_id,
                instructorId: updatedMeta.instructorId,
                price: updatedMeta.price,
                thumbnailUrl: updatedMeta.thumbnailUrl,
                videoUrl: updatedMeta.videoUrl,
                status: updatedMeta.status,
                requirements: {
                    create: (updatedMeta.requirements ?? []).map((req) => ({
                        text: req,
                    })),
                },
                sessions: {
                    create: (updatedMeta.sessions ?? []).map((s) => ({
                        title: s.title,
                        position: s.position,
                        lessons: {
                            create: (s.lessons ?? []).map((l) => ({
                                title: l.title,
                                position: l.position,
                                docUrl: l.doc_url,
                                videoUrl: l.video_url,
                                duration: l.duration,
                            })),
                        },
                    })),
                },
            },
            include: {
                requirements: true,
                sessions: { include: { lessons: true } },
            },
        });
        if (!course) {
            throw new common_1.HttpException('Course creation failed', 500);
        }
        this.indexCourse(course);
        return course;
    }
    async editCourse(meta, files) {
        const uploadedUrls = await Promise.all(files.map(async (file) => {
            const objectName = await this.minioService.uploadFile('course-files', file);
            const url = await this.minioService.getPresignedUrl('course-files', objectName, 3600 * 24 * 7);
            return { field: file.fieldname, url };
        }));
        const updatedMeta = this.attachFilesToMeta(meta, uploadedUrls);
        const existingCourse = await this.prisma.course.findUnique({
            where: { id: meta.idCourse },
            include: {
                sessions: { include: { lessons: true } },
                requirements: true,
            },
        });
        if (!existingCourse) {
            throw new common_1.HttpException('Course not found', 404);
        }
        await this.prisma.courseRequirement.deleteMany({
            where: {
                courseId: meta.idCourse,
            },
        });
        await this.prisma.lesson.deleteMany({
            where: {
                session: { courseId: meta.idCourse },
            },
        });
        await this.prisma.session.deleteMany({
            where: { courseId: meta.idCourse },
        });
        const updatedCourse = await this.prisma.course.update({
            where: { id: meta.idCourse },
            data: {
                title: updatedMeta.title,
                description: updatedMeta.description,
                categoryId: updatedMeta.category_id,
                price: updatedMeta.price,
                thumbnailUrl: updatedMeta.thumbnailUrl,
                videoUrl: updatedMeta.videoUrl,
                status: updatedMeta.status,
                requirements: {
                    create: (updatedMeta.requirements ?? []).map((req) => ({
                        text: req,
                    })),
                },
                sessions: {
                    create: (updatedMeta.sessions ?? []).map((s) => ({
                        title: s.title,
                        position: s.position,
                        lessons: {
                            create: (s.lessons ?? []).map((l) => ({
                                title: l.title,
                                position: l.position,
                                docUrl: l.doc_url,
                                videoUrl: l.video_url,
                            })),
                        },
                    })),
                },
            },
            include: {
                category: true,
                requirements: true,
                sessions: { include: { lessons: true } },
            },
        });
        return updatedCourse;
    }
    async addReview(userId, courseId, rating, comment) {
        try {
            const course = await this.prisma.course.findUnique({
                where: { id: courseId },
            });
            if (!course) {
                throw new Error('Course not found!');
            }
            const enrolled = await this.prisma.enrollment.findFirst({
                where: { userId, courseId },
            });
            if (!enrolled) {
                throw new Error('You must enrolling before review');
            }
            const existingReview = await this.prisma.review.findFirst({
                where: { userId, courseId },
            });
            if (existingReview) {
                if (rating < 1 || rating > 5) {
                    throw new Error('Point must be between 1 to 5');
                }
                const updated = await this.prisma.review.update({
                    where: { id: existingReview.id },
                    data: { rating, comment, updatedAt: new Date() },
                });
                return { message: 'Review success', data: updated };
            }
            else {
                if (rating < 1) {
                    rating = 1;
                }
                else if (rating > 5) {
                    rating = 5;
                }
                const review = await this.prisma.review.create({
                    data: {
                        userId,
                        courseId,
                        rating,
                        comment: comment,
                    },
                });
                return { message: 'Review success', data: review };
            }
        }
        catch (error) {
            console.error('Lỗi khi thêm đánh giá:', error);
            throw new Error(error.message || 'Error when reviewing!');
        }
    }
    async updateProgress(userId, courseId, lessonId) {
        try {
            const course = await this.prisma.course.findUnique({
                where: { id: courseId },
                include: { sessions: { include: { lessons: true } } },
            });
            if (!course) {
                throw new Error('Course not found!');
            }
            const enrollment = await this.prisma.enrollment.findFirst({
                where: { userId, courseId },
            });
            if (!enrollment) {
                throw new Error('You must enroll before tracking progress!');
            }
            const lessonFound = course.sessions
                .flatMap((s) => s.lessons)
                .find((l) => l.id === lessonId);
            if (!lessonFound) {
                throw new Error('Invalid lesson or it does not belong to this course!');
            }
            const totalLessons = course.sessions.reduce((sum, s) => sum + s.lessons.length, 0);
            if (totalLessons === 0) {
                throw new Error('This course does not have any lessons yet!');
            }
            let progress = await this.prisma.courseProgress.findFirst({
                where: { userId, courseId },
            });
            let completedLessons = 0;
            if (!progress) {
                progress = await this.prisma.courseProgress.create({
                    data: {
                        userId,
                        courseId,
                        lastLessonId: lessonId,
                        progressPercentage: 0,
                    },
                });
            }
            if (progress.lastLessonId === lessonId) {
                return { message: 'You have already completed this lesson!' };
            }
            else {
                const completed = await this.prisma.courseNote.findMany({
                    where: { userId, courseId },
                });
                completedLessons = completed.length;
                const newProgress = ((completedLessons + 1) / totalLessons) * 100;
                let progressPercentage = newProgress;
                if (progressPercentage > 100) {
                    progressPercentage = 100;
                }
                else if (progressPercentage < 0) {
                    progressPercentage = 0;
                }
                const updatedProgress = await this.prisma.courseProgress.update({
                    where: { id: progress.id },
                    data: {
                        lastLessonId: lessonId,
                        progressPercentage: progressPercentage,
                        updatedAt: new Date(),
                    },
                });
                if (progressPercentage === 100) {
                    return {
                        message: 'Congratulations! You have completed the course!',
                        progress: updatedProgress,
                    };
                }
                else if (progressPercentage > 80) {
                    return {
                        message: 'Almost there! Keep going, you are close to finishing!',
                        progress: updatedProgress,
                    };
                }
                else if (progressPercentage > 50) {
                    return {
                        message: 'You are more than halfway through the course!',
                        progress: updatedProgress,
                    };
                }
                else if (progressPercentage > 25) {
                    return {
                        message: 'Good job! You are making great progress!',
                        progress: updatedProgress,
                    };
                }
                else {
                    return {
                        message: 'You just got started, keep learning!',
                        progress: updatedProgress,
                    };
                }
            }
        }
        catch (error) {
            console.error('Error while updating progress:', error);
            throw new Error(error.message || 'Failed to update progress!');
        }
    }
    async createNote({ userId, courseId, note }) {
        if (!userId || !courseId || !note?.trim()) {
            return { success: false, message: 'Missing userId, courseId or note.' };
        }
        const cleanNote = note.trim();
        if (cleanNote.length < 3) {
            return {
                success: false,
                message: 'Note is too short. Please write at least 3 characters.',
            };
        }
        if (cleanNote.length > 1000) {
            return {
                success: false,
                message: 'Note is too long. Max length: 1000 characters.',
            };
        }
        const [user, course] = await Promise.all([
            this.prisma.user.findUnique({ where: { id: userId } }),
            this.prisma.course.findUnique({ where: { id: courseId } }),
        ]);
        if (!user)
            return { success: false, message: 'User not found.' };
        if (!course)
            return { success: false, message: 'Course not found.' };
        if (course.status === 'draft') {
            return {
                success: false,
                message: 'This course is not yet published, you cannot add notes.',
            };
        }
        const enrollment = await this.prisma.enrollment.findFirst({
            where: { userId, courseId },
        });
        if (!enrollment) {
            return {
                success: false,
                message: 'You are not enrolled in this course.',
            };
        }
        const duplicate = await this.prisma.courseNote.findFirst({
            where: {
                userId,
                courseId,
                note: cleanNote,
            },
        });
        if (duplicate) {
            return { success: false, message: 'You already added a similar note.' };
        }
        const newNote = await this.prisma.courseNote.create({
            data: {
                userId,
                courseId,
                note: cleanNote,
            },
        });
        await this.prisma
            .$executeRawUnsafe(`
    INSERT INTO note_audit_logs (user_id, course_id, action, created_at)
    VALUES ('${userId}', '${courseId}', 'create_note', NOW())
  `)
            .catch(() => { });
        return {
            success: true,
            message: 'Note created successfully.',
            data: {
                ...newNote,
                user: { id: user.id, full_name: user.full_name },
                course: { id: course.id, title: course.title },
            },
        };
    }
    async getCourseStatistics() {
        try {
            const courses = await this.prisma.course.findMany({
                include: {
                    enrollments: true,
                    instructor: { select: { full_name: true, email: true } },
                },
            });
            if (!courses || courses.length === 0) {
                return {
                    message: 'No course in system.',
                    totalCourses: 0,
                    totalRevenue: 0,
                    data: [],
                };
            }
            const data = [];
            let totalRevenue = 0;
            for (const course of courses) {
                let studentCount = 0;
                let revenue = 0;
                if (course.enrollments && course.enrollments.length > 0) {
                    studentCount = course.enrollments.length;
                    if (course.price && course.price > 0) {
                        revenue = course.price * studentCount;
                    }
                    else {
                        revenue = 0;
                    }
                }
                else {
                    studentCount = 0;
                    revenue = 0;
                }
                if (course.status === 'draft') {
                    continue;
                }
                totalRevenue += revenue;
                data.push({
                    id: course.id,
                    title: course.title,
                    instructor: course.instructor?.full_name ?? 'Not update',
                    price: course.price,
                    studentCount,
                    revenue,
                    status: course.status,
                    createdAt: course.createdAt,
                });
            }
            if (data.length === 0) {
                return {
                    message: 'All course is draf state.',
                    totalCourses: 0,
                    totalRevenue: 0,
                    data: [],
                };
            }
            return {
                totalCourses: data.length,
                totalRevenue,
                data,
            };
        }
        catch (error) {
            console.error('[CourseStatisticsService] error:', error);
            if (error.code === 'P1001') {
                throw new Error('No connect to database.');
            }
            else if (error.code === 'P2002') {
                throw new Error('duplicate or error unique key.');
            }
            else {
                throw new Error('External server.');
            }
        }
    }
    async completeLesson(userId, lessonId) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                session: {
                    include: { course: true },
                },
            },
        });
        if (!lesson)
            throw new Error('Lesson not found or delete.');
        const courseId = lesson.session.course.id;
        const enrolled = await this.prisma.enrollment.findFirst({
            where: { userId, courseId },
        });
        if (!enrolled)
            throw new Error('User have not yet registed for this course');
        const totalLessons = await this.prisma.lesson.count({
            where: { session: { courseId } },
        });
        if (totalLessons === 0)
            throw new Error('This course not yet lession');
        let progress = await this.prisma.courseProgress.findFirst({
            where: { userId, courseId },
        });
        if (!progress) {
            progress = await this.prisma.courseProgress.create({
                data: {
                    userId,
                    courseId,
                    lastLessonId: lessonId,
                    progressPercentage: new this.prisma.Decimal(0),
                },
            });
        }
        await this.prisma.lesson.update({
            where: { id: lessonId },
            data: { lessionStatus: true },
        });
        const completedCount = await this.prisma.lesson.count({
            where: {
                session: { courseId },
                lessionStatus: true,
            },
        });
        const percentage = (completedCount / totalLessons) * 100;
        const updated = await this.prisma.courseProgress.update({
            where: { id: progress.id },
            data: {
                lastLessonId: lessonId,
                progressPercentage: new this.prisma.Decimal(percentage.toFixed(2)),
                updatedAt: new Date(),
            },
        });
        if (updated) {
            throw new common_1.HttpException('Progress have not yet updated, please try again!', 400);
        }
        return {
            message: `Lesson "${lesson.title}" finish course.`,
            progress: `${percentage.toFixed(2)}%`,
            lastLesson: lesson.title,
        };
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    __param(0, (0, common_1.Inject)('PRISMA_CLIENT')),
    __metadata("design:paramtypes", [prisma_1.PrismaClient,
        minio_service_1.MinioService,
        elasticsearch_service_1.ElasticService])
], CourseService);
//# sourceMappingURL=course.service.js.map