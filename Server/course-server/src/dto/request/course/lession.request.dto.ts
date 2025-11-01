import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class LessonDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(1)
  position: number;

  @IsOptional()
  @IsString()
  doc_url?: string;

  @IsOptional()
  @IsString()
  video_url?: string;
}
