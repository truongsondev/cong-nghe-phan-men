import { CourseService } from './course.service';
import { CourseReview } from 'src/dto/request/course/course.review.dto';
export declare class CoursesController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getAllCategories(): Promise<{
        id: string;
        name: string;
    }[]>;
    createCourse(courseData: any, files: Express.Multer.File[]): Promise<{
        message: string;
    }>;
    getCourseForEdit(courseId: string): Promise<import("../dto/response/course-edit-response").CourseEditResponse>;
    getAllCourses(): Promise<any[]> | undefined;
    getCourseForHome(limit: number): Promise<any[]>;
    getCourse(courseId: string, userId?: string): Promise<{
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
    getReivew(courseId: string): Promise<({
        user: {
            full_name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        userId: string;
        rating: number;
        comment: string | null;
    })[]>;
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
    editCourse(course: any, files: Express.Multer.File[]): Promise<any>;
    reviewCourse(reviewInfor: CourseReview): Promise<{
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            courseId: string;
            userId: string;
            rating: number;
            comment: string | null;
        };
    }>;
}
