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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma/index.js");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    updateProfile = async (userId, full_name, bio) => {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                throw new common_1.HttpException('User not found!', 404);
            }
            if (![full_name, bio].some(Boolean)) {
                throw new common_1.HttpException('No data to update!', 400);
            }
            const updateData = {
                userId: userId,
                full_name: full_name,
                bio: bio,
            };
            if (full_name?.trim()) {
                if (full_name.length < 3 || full_name.length > 50) {
                    throw new common_1.HttpException('Full name must be 3–50 characters.', 400);
                }
                if (!/^[a-zA-Z\sÀ-ỹ]+$/.test(full_name)) {
                    throw new common_1.HttpException('Full name contains invalid characters!', 400);
                }
                updateData.full_name = full_name.trim();
            }
            if (bio?.trim()) {
                if (bio.length < 10 || bio.length > 300) {
                    throw new common_1.HttpException('Bio must be 10–300 characters.', 400);
                }
                updateData.bio = bio.trim();
            }
            const updated = await this.prisma.user.update({
                where: { id: userId },
                data: updateData,
            });
            return {
                message: 'Profile updated successfully!',
                user: updated,
            };
        }
        catch (err) {
            console.error(err);
            throw new common_1.HttpException('Internal server error.', 500);
        }
    };
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    __param(0, (0, common_1.Inject)('PRISMA_CLIENT')),
    __metadata("design:paramtypes", [prisma_1.PrismaClient])
], UserService);
//# sourceMappingURL=user.service.js.map