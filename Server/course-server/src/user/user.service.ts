import { HttpException, Inject } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { UserUpdate } from 'src/dto/request/user/user-update.dto';
import * as bcrypt from 'bcrypt';
export class UserService {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}
  updateProfile = async (userId, full_name, bio) => {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new HttpException('User not found!', 404);
      }

      if (![full_name, bio].some(Boolean)) {
        throw new HttpException('No data to update!', 400);
      }

      const updateData: {
        userId: string;
        full_name: string;
        bio: string;
      } = {
        userId: userId,
        full_name: full_name,
        bio: bio,
      };

      if (full_name?.trim()) {
        if (full_name.length < 3 || full_name.length > 50) {
          throw new HttpException('Full name must be 3–50 characters.', 400);
        }

        if (!/^[a-zA-Z\sÀ-ỹ]+$/.test(full_name)) {
          throw new HttpException(
            'Full name contains invalid characters!',
            400,
          );
        }

        updateData.full_name = full_name.trim();
      }

      if (bio?.trim()) {
        if (bio.length < 10 || bio.length > 300) {
          throw new HttpException('Bio must be 10–300 characters.', 400);
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
    } catch (err) {
      console.error(err);
      throw new HttpException('Internal server error.', 500);
    }
  };

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        courses: {
          include: {
            category: { select: { name: true } },
            reviews: true,
            enrollments: true,
          },
        },
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                price: true,
                status: true,
                category: { select: { name: true } },
                instructor: { select: { full_name: true } },
              },
            },
          },
        },
        reviews: true,
        courseProgress: {
          include: {
            course: { select: { id: true, title: true } },
            lastLesson: { select: { id: true, title: true, position: true } },
          },
        },
      },
    });

    if (!user) throw new HttpException('User không tồn tại', 404);

    // Chuẩn hóa dữ liệu trả về cho frontend
    return {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      createdAt: user.createdAt,
      courses: user.courses.map((c) => ({
        id: c.id,
        title: c.title,
        category: c.category?.name,
        price: c.price,
        status: c.status,
        studentsCount: c.enrollments.length,
        rating:
          c.reviews.length > 0
            ? c.reviews.reduce((acc, r) => acc + r.rating, 0) / c.reviews.length
            : null,
      })),
      enrolledCourses: user.enrollments.map((e) => ({
        id: e.course.id,
        title: e.course.title,
        instructor: e.course.instructor?.full_name,
        price: e.course.price,
        category: e.course.category?.name,
        status: e.course.status,
      })),
      progress: user.courseProgress.map((p) => ({
        courseId: p.courseId,
        courseTitle: p.course.title,
        progressPercentage: p.progressPercentage,
        lastLesson: p.lastLesson
          ? {
              id: p.lastLesson.id,
              title: p.lastLesson.title,
              position: p.lastLesson.position,
            }
          : null,
      })),
    };
  }

  async updateUserProfile(userId: string, data: any) {
    const { fullName, bio } = data;
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(fullName && { full_name: fullName }),

        ...(bio && { bio }),
      },
      select: {
        id: true,
        email: true,
        full_name: true,
        bio: true,
        role: true,
        user_verified: true,
        createdAt: true,
      },
    });
  }
}
