import type { createSessionDTO, sessionDTO } from "./session.request.dto";

export interface courseRequestDto {
  id: string;
  title: string;
  description: string;
  category_id: string;
  price: number;
  thumbnailUrl: string;
  videoUrl: string;
  status: string;
  instructorId: string;
  requirements?: string[];
  sessions: sessionDTO[];
  // quizzes: QuizRequestDto[];
}

export interface CreateCourseRequestDto {
  title: string;
  description: string;
  category_id: string;
  price: number;
  thumbnailUrl: string;
  videoUrl: string;
  status: string;
  instructorId: string;
  requirements?: string[];
  sessions: createSessionDTO[];
}
