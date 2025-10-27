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
const cloud_service_1 = require("./cloud.service");
let CoursesController = class CoursesController {
    cloudService;
    constructor(cloudService) {
        this.cloudService = cloudService;
    }
    deleteFile(fileId) {
        for (const id of fileId.fileId) {
            this.cloudService.deleteFile(id);
        }
        return {
            message: 'Files deleted successfully',
        };
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)('delete-file'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "deleteFile", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('cloud'),
    __metadata("design:paramtypes", [cloud_service_1.CloudService])
], CoursesController);
//# sourceMappingURL=cloud.controller.js.map