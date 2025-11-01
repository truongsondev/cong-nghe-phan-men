import { PrismaClient } from 'generated/prisma';
import { CourseEditResponse } from 'src/dto/response/course-edit-response';
import { ElasticService } from 'src/elasticsearch/elasticsearch.service';
import { MinioService } from 'src/minio/minio.service';
export declare class CourseService {
    private readonly prisma;
    private readonly minioService;
    private readonly elastic;
    constructor(prisma: PrismaClient, minioService: MinioService, elastic: ElasticService);
    indexCourse(course: any): Promise<void>;
    searchCourses(keyword: string): Promise<unknown[]>;
    getAllCourses(limit: number): Promise<any[]>;
    getReview(courseId: string): Promise<({
        user: {
            full_name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        updatedAt: Date;
        courseId: string;
        rating: number;
        comment: string | null;
    })[]>;
    getCourseDetail(courseId: string, userId: string | undefined): Promise<{
        id: string;
        title: string;
        description: string;
        instructorName: string | null;
        thumbnailUrl: string;
        videoUrl: string;
        price: number;
        requirements: string[];
        avgRating: number;
        studentCount: number;
        totalDuration: number;
        sessions: {
            id: string;
            title: string;
            position: number;
            lessons: {
                id: string;
                title: string;
                duration: number;
                videoUrl: string | null;
                docUrl: string | null;
                position: number;
            }[];
        }[];
        isEnrolled: boolean;
        reviews: {
            rating: number;
            comment: string | null;
            createdAt: string;
            user: {
                full_name: string | null;
            };
        }[];
        category: {
            id: string;
            name: string;
        } | null;
        createdAt: string;
    }>;
    getCourseForWatch(courseId: string, userId: string): Promise<{
        isEnrolled: boolean;
        message: string;
        id: string;
        title: string;
        description: string;
        sessions: {
            id: string;
            title: string;
            position: number;
            lessons: {
                id: string;
                title: string;
                videoUrl: string | null;
                docUrl: string | null;
                position: number;
                lessionStatus: boolean;
                duration: number | null;
            }[];
        }[];
        note?: undefined;
        progress?: undefined;
    } | {
        id: string;
        title: string;
        description: string;
        sessions: {
            id: string;
            title: string;
            position: number;
            lessons: {
                id: string;
                title: string;
                videoUrl: string | null;
                docUrl: string | null;
                lessionStatus: boolean;
                duration: number | null;
                position: number;
            }[];
        }[];
        isEnrolled: boolean;
        note: {
            id: string;
            createdAt: Date;
            note: string;
        } | null;
        progress: {
            progressPercentage: number;
            lastLessonId: string | null;
            updatedAt: Date;
        } | {
            progressPercentage: number;
            lastLessonId: null;
            updatedAt?: undefined;
        };
    } | null>;
    getAllCategories(): Promise<{
        id: string;
        name: string;
    }[]>;
    getCourseForEdit(courseId: string): Promise<CourseEditResponse>;
    private attachFilesToMeta;
    createCourse(files: Express.Multer.File[], meta: any): Promise<{
        requirements: {
            id: string;
            courseId: string;
            text: string;
        }[];
        sessions: ({
            lessons: {
                id: string;
                createdAt: Date;
                title: string;
                videoUrl: string | null;
                updatedAt: Date;
                sessionId: string;
                docUrl: string | null;
                position: number;
                lessionStatus: boolean;
                duration: number | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            title: string;
            courseId: string;
            position: number;
            expiresAt: Date;
        })[];
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        instructorId: string;
        thumbnailUrl: string;
        videoUrl: string;
        status: string;
        categoryId: string | null;
        price: number;
        updatedAt: Date;
    }>;
    editCourse(meta: any, files: any): Promise<any>;
    addReview(userId: string, courseId: string, rating: number, comment?: string): Promise<{
        message: string;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            courseId: string;
            rating: number;
            comment: string | null;
        };
    }>;
    updateProgress(userId: string, courseId: string, lessonId: string): Promise<{
        message: string;
        progress?: undefined;
    } | {
        message: string;
        progress: {
            id: string;
            userId: string;
            updatedAt: Date;
            courseId: string;
            lastLessonId: string | null;
            progressPercentage: import("generated/prisma/runtime/library").Decimal;
        };
    }>;
    createNote(userId: any, courseId: any, note: any, noteId: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        courseId: string;
        note: string;
    }>;
    getCourseStatistics(): Promise<{
        message: string;
        totalCourses: number;
        totalRevenue: number;
        data: never[];
    } | {
        totalCourses: number;
        totalRevenue: number;
        data: {
            id: string;
            title: string;
            instructor: string;
            price: number;
            studentCount: number;
            revenue: number;
            status: string;
            createdAt: Date;
        }[];
        message?: undefined;
    }>;
    completeLesson(userId: string, lessonId: string): Promise<{
        message: string;
        progress: string;
        lastLesson: string;
    }>;
    markLectureCompleted(idLecture: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        videoUrl: string | null;
        updatedAt: Date;
        sessionId: string;
        docUrl: string | null;
        position: number;
        lessionStatus: boolean;
        duration: number | null;
    }>;
}
