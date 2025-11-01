import { IsNumber, IsString } from 'class-validator';

export class CourseReview {
  @IsString()
  userId: string;
  @IsString()
  courseId: string;
  @IsNumber()
  rating: number;
  @IsString()
  comment: string;
}
