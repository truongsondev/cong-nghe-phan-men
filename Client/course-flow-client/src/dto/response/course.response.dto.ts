import type { sessionDTO } from "../request/session.request.dto";

export interface CourseHomeResponse {
  id: number;
  title: string;
  thumbnailUrl: string;
  price: number;
  status: string;
  category: string;
  avgRating: number;
  students: number;
}

export interface CourseInstructorResponse {
  id: string;
  title: string;
  price: number;
  students: number;
  videoUrl: string;
  thumbnailUrl: string;
  requirements?: string[];
  sessions: sessionDTO[];
  status: "published" | "paused" | "draft";
  avgRating: number;
  category: CategoriesResponse;
  createdAt: string;
}

export interface CourseEditReponse {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  videoUrl: string;
  requirements?: string[];
  sessions: sessionDTO[];
  status: "published" | "paused" | "draft";
  category: CategoriesResponse;
}

export interface CategoriesResponse {
  id: string;
  name: string;
}

export interface LessonDetail {
  id: string;
  title: string;
  duration: number;
  videoUrl?: string;
  docUrl?: string;
}

export interface SessionDetail {
  id: string;
  title: string;
  position: number;
  lessons: LessonDetail[];
}

export interface Reviews {
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    full_name: string;
  };
}

export interface CourseReponse {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  videoUrl?: string;
  status: "published" | "paused" | "draft";
  category: CategoriesResponse;
  requirements: string[];
  avgRating: number;
  studentCount: number;
  instructorName?: string;
  totalDuration?: number;
  createdAt?: string;

  sessions: SessionDetail[];

  isEnrolled: boolean;
}

export interface LessonWatch {
  id: string;
  title: string;
  videoUrl?: string | null;
  docUrl?: string | null;
  duration?: number | null;
  position: number;
  lessionStatus: boolean;
}

export interface SessionWatch {
  id: string;
  title: string;
  position: number;
  lessons: LessonWatch[];
}

export interface CourseNoteWatch {
  id: string;
  note: string;
  createdAt: string;
}

export interface CourseProgressWatch {
  progressPercentage: number;
  lastLessonId?: string | null;
  updatedAt?: string | null;
}

export interface CourseWatchResponse {
  id: string;
  title: string;
  description: string;
  sessions: SessionWatch[];
  isEnrolled: boolean;
  note: CourseNoteWatch | "";
  progress: CourseProgressWatch;
  message?: string;
}
