import {
  IsString,
  IsNumber,
  Min,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LessonDto } from './lession.request.dto';

export class SessionDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(1)
  position: number;

  @ValidateNested({ each: true })
  @Type(() => LessonDto)
  @ArrayMinSize(1)
  lessons: LessonDto[];
}
