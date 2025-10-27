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
}
