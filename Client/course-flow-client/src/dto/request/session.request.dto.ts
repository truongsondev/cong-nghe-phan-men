import type {
  CreateLessonRequestDto,
  LessonRequestDto,
} from "./lesson.request.dto";

export interface sessionDTO {
  id: string;
  title: string;
  position: number;
  lessons: LessonRequestDto[];
}

export interface createSessionDTO {
  title: string;
  position: number;
  lessons: CreateLessonRequestDto[];
}
