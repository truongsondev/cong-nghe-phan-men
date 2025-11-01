import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CourseReview } from 'src/dto/request/course/course.review.dto';
import { CreateNoteDto } from 'src/dto/request/course/course-note.request.dto';

@Controller()
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @Get('categories')
  @HttpCode(200)
  getAllCategories() {
    return this.courseService.getAllCategories();
  }

  @Post('create-course')
  @HttpCode(201)
  @UseInterceptors(AnyFilesInterceptor())
  async createCourse(
    @Body() courseData: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const meta = JSON.parse(courseData.meta);

    await this.courseService.createCourse(files, meta);

    return { message: 'Course created' };
  }

  @Get('course-for-edit/:courseId')
  @HttpCode(200)
  getCourseForEdit(@Param('courseId') courseId: string) {
    return this.courseService.getCourseForEdit(courseId);
  }

  @Get('courses')
  @HttpCode(200)
  getAllCourses() {
    try {
      return this.courseService.getAllCourses(0);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('course/home/:limit')
  @HttpCode(200)
  getCourseForHome(@Param('limit') limit: number) {
    return this.courseService.getAllCourses(limit);
  }

  @Get('course-detail/:courseId/:userId')
  @HttpCode(200)
  getCourse(
    @Param('courseId') courseId: string,
    @Param('userId') userId?: string,
  ) {
    return this.courseService.getCourseDetail(courseId, userId);
  }

  @Get('review/:courseId')
  @HttpCode(200)
  getReivew(@Param('courseId') courseId: string) {
    return this.courseService.getReview(courseId);
  }

  @Get('course-watch/:courseId/:userId')
  @HttpCode(200)
  getCourseForWatch(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
  ) {
    return this.courseService.getCourseForWatch(courseId, userId);
  }

  @Put('course-edit')
  @HttpCode(200)
  @UseInterceptors(AnyFilesInterceptor())
  editCourse(
    @Body() course: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(course);
    const meta = JSON.parse(course.meta);
    return this.courseService.editCourse(meta, files);
  }

  @Post('review-course')
  @HttpCode(201)
  reviewCourse(@Body() reviewInfor: CourseReview) {
    const { courseId, userId, rating, comment } = { ...reviewInfor };
    return this.courseService.addReview(userId, courseId, rating, comment);
  }

  @Post('create-note')
  @HttpCode(201)
  createNote(@Body() body: CreateNoteDto) {
    const { userId, courseId, noteData, noteId } = body;
    return this.courseService.createNote(userId, courseId, noteData, noteId);
  }

  @Patch('mark-done-lecture')
  @HttpCode(200)
  markLectureCompleted(@Body('lessionId') lessionId: string) {
    console.log('lessionId::', lessionId);
    return this.courseService.markLectureCompleted(lessionId);
  }

  @Get('search-courses')
  @HttpCode(200)
  searchCourses(@Query('query') query: string) {
    console.log(query);
    return this.courseService.searchCourses(query);
  }
}
