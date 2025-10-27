import { AuthService } from './auth.service';
import { VerifyOtpDto } from 'src/dto/verify-otp.dto';
import { UserAuthDTO } from 'src/dto/user-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(data: UserAuthDTO): Promise<{
        otpToken: any;
    }>;
    verifyOtp(data: VerifyOtpDto): Promise<{
        message: string;
    }>;
    getTTL(emailToken: string): Promise<{
        ttl: number;
    }>;
    signIn(data: UserAuthDTO): Promise<{
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
}
