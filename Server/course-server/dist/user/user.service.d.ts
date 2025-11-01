import { PrismaClient } from 'generated/prisma';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    updateProfile: (userId: any, full_name: any, bio: any) => Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            password: string;
            full_name: string | null;
            role: import("generated/prisma").$Enums.Role;
            bio: string | null;
            otp: string | null;
            otp_expiry: Date | null;
            otp_verified: boolean | null;
            otp_attempts: number;
            user_verified: boolean;
            createdAt: Date;
        };
    }>;
    getUserProfile(userId: string): Promise<{
        id: string;
        fullName: string | null;
        email: string;
        role: import("generated/prisma").$Enums.Role;
        bio: string | null;
        createdAt: Date;
        courses: {
            id: string;
            title: string;
            category: string | undefined;
            price: number;
            status: string;
            studentsCount: number;
            rating: number | null;
        }[];
        enrolledCourses: {
            id: string;
            title: string;
            instructor: string | null;
            price: number;
            category: string | undefined;
            status: string;
        }[];
        progress: {
            courseId: string;
            courseTitle: string;
            progressPercentage: import("generated/prisma/runtime/library").Decimal;
            lastLesson: {
                id: string;
                title: string;
                position: number;
            } | null;
        }[];
    }>;
    updateUserProfile(userId: string, data: any): Promise<{
        id: string;
        email: string;
        full_name: string | null;
        role: import("generated/prisma").$Enums.Role;
        bio: string | null;
        user_verified: boolean;
        createdAt: Date;
    }>;
}
