export interface LessonRequestDto {
  id: string;
  title: string;
  doc_url?: string | File;
  video_url?: string | File;
  position: number;
}

export interface CreateLessonRequestDto {
  title: string;
  doc_url?: string | File;
  video_url?: string | File;
  position: number;
}
