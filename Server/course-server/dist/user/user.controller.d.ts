import { UserService } from './user.service';
export declare class UsersController {
    private userService;
    constructor(userService: UserService);
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
    updateUser(id: string, body: {
        fullName?: string;
        bio?: string;
    }): Promise<{
        id: string;
        email: string;
        full_name: string | null;
        role: import("generated/prisma").$Enums.Role;
        bio: string | null;
        user_verified: boolean;
        createdAt: Date;
    }>;
}
