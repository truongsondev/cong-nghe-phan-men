// src/dto/response/course.response.dto.ts

export interface LessonEditResponse {
  id: string;
  title: string;
  video_url?: string;
  doc_url?: string;
  position: number;
}

export interface SessionEditResponse {
  id: string;
  title: string;
  position: number;
  lessons: LessonEditResponse[];
}

export interface CategoryResponse {
  id: string;
  name: string;
}

export interface CourseEditResponse {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  videoUrl: string;
  requirements: string[];
  sessions: SessionEditResponse[];
  status: 'published' | 'paused' | 'draft';
  category: CategoryResponse | null;
}
