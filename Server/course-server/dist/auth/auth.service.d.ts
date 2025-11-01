import { ClientKafka } from '@nestjs/microservices';
import { PrismaClient } from 'generated/prisma';
import Redis from 'ioredis';
import JWTClient from 'src/jwt/jwt';
export declare class AuthService {
    private readonly kafka;
    private readonly prisma;
    private readonly redis;
    private readonly jwtClient;
    constructor(kafka: ClientKafka, prisma: PrismaClient, redis: Redis, jwtClient: JWTClient);
    onModuleInit(): Promise<void>;
    signUp(email: string, password: string): Promise<{
        otpToken: any;
    }>;
    generateOtp(): string;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
    getTTL(tokenEmail: string): Promise<{
        ttl: number;
    }>;
    signIn(email: string, passwordReq: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            full_name: string | null;
            role: import("generated/prisma").$Enums.Role;
            bio: string | null;
            user_verified: boolean;
            createdAt: Date;
        };
    }>;
    getSignature(): {
        token: string;
        expire: number;
        signature: string;
    };
    getRole(userId: string | undefined): Promise<import("generated/prisma").$Enums.Role>;
}
