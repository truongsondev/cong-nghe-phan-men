import { SessionDto } from './session.request.dto';
export declare enum CourseStatus {
    Draft = "draft",
    Published = "published",
    Paused = "paused"
}
export declare class CreateCourseDto {
    title: string;
    description: string;
    category_id: string;
    price: number;
    thumbnailUrl: string;
    videoUrl: string;
    status: CourseStatus;
    instructorId: string;
    requirements?: string[];
    sessions: SessionDto[];
}
