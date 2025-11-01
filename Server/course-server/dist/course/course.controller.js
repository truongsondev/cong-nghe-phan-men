"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const platform_express_1 = require("@nestjs/platform-express");
const course_review_dto_1 = require("../dto/request/course/course.review.dto");
const course_note_request_dto_1 = require("../dto/request/course/course-note.request.dto");
let CoursesController = class CoursesController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    getAllCategories() {
        return this.courseService.getAllCategories();
    }
    async createCourse(courseData, files) {
        const meta = JSON.parse(courseData.meta);
        await this.courseService.createCourse(files, meta);
        return { message: 'Course created' };
    }
    getCourseForEdit(courseId) {
        return this.courseService.getCourseForEdit(courseId);
    }
    getAllCourses() {
        try {
            return this.courseService.getAllCourses(0);
        }
        catch (error) {
            console.log(error);
        }
    }
    getCourseForHome(limit) {
        return this.courseService.getAllCourses(limit);
    }
    getCourse(courseId, userId) {
        return this.courseService.getCourseDetail(courseId, userId);
    }
    getReivew(courseId) {
        return this.courseService.getReview(courseId);
    }
    getCourseForWatch(courseId, userId) {
        return this.courseService.getCourseForWatch(courseId, userId);
    }
    editCourse(course, files) {
        console.log(course);
        const meta = JSON.parse(course.meta);
        return this.courseService.editCourse(meta, files);
    }
    reviewCourse(reviewInfor) {
        const { courseId, userId, rating, comment } = { ...reviewInfor };
        return this.courseService.addReview(userId, courseId, rating, comment);
    }
    createNote(body) {
        const { userId, courseId, noteData, noteId } = body;
        return this.courseService.createNote(userId, courseId, noteData, noteId);
    }
    markLectureCompleted(lessionId) {
        console.log('lessionId::', lessionId);
        return this.courseService.markLectureCompleted(lessionId);
    }
    searchCourses(query) {
        console.log(query);
        return this.courseService.searchCourses(query);
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Get)('categories'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Post)('create-course'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)('course-for-edit/:courseId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCourseForEdit", null);
__decorate([
    (0, common_1.Get)('courses'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)('course/home/:limit'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCourseForHome", null);
__decorate([
    (0, common_1.Get)('course-detail/:courseId/:userId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCourse", null);
__decorate([
    (0, common_1.Get)('review/:courseId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getReivew", null);
__decorate([
    (0, common_1.Get)('course-watch/:courseId/:userId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCourseForWatch", null);
__decorate([
    (0, common_1.Put)('course-edit'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "editCourse", null);
__decorate([
    (0, common_1.Post)('review-course'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_review_dto_1.CourseReview]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "reviewCourse", null);
__decorate([
    (0, common_1.Post)('create-note'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_note_request_dto_1.CreateNoteDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "createNote", null);
__decorate([
    (0, common_1.Patch)('mark-done-lecture'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('lessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "markLectureCompleted", null);
__decorate([
    (0, common_1.Get)('search-courses'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "searchCourses", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CoursesController);
//# sourceMappingURL=course.controller.js.map