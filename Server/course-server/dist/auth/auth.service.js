"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const prisma_1 = require("../../generated/prisma/index.js");
const rxjs_1 = require("rxjs");
const bcrypt = __importStar(require("bcrypt"));
const roles_1 = require("../enum/roles");
const ioredis_1 = __importDefault(require("ioredis"));
const jwt_1 = __importDefault(require("../jwt/jwt"));
const crypto_1 = require("crypto");
const imagekit_1 = __importDefault(require("imagekit"));
let AuthService = class AuthService {
    kafka;
    prisma;
    redis;
    jwtClient;
    constructor(kafka, prisma, redis, jwtClient) {
        this.kafka = kafka;
        this.prisma = prisma;
        this.redis = redis;
        this.jwtClient = jwtClient;
    }
    async onModuleInit() {
        console.log('connecting to kafka...');
        await this.kafka.connect();
    }
    async signUp(email, password) {
        const otp = this.generateOtp();
        console.log(otp);
        try {
            const otpToken = await this.prisma.$transaction(async (tx) => {
                const user = await tx.user.findUnique({ where: { email } });
                if (user && user.user_verified) {
                    throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                await tx.user.upsert({
                    where: { email },
                    update: {
                        otp,
                        otp_expiry: new Date(Date.now() + 60 * 1000),
                        otp_verified: false,
                        otp_attempts: user ? user.otp_attempts + 1 : 0,
                        password: hashedPassword,
                    },
                    create: {
                        email,
                        role: roles_1.ROLES.GUEST,
                        otp,
                        otp_expiry: new Date(Date.now() + 5 * 60 * 1000),
                        password: hashedPassword,
                    },
                });
                const tokenOtp = await bcrypt.hash(email, 10);
                const ttl = 60;
                const key = `otp:email:${tokenOtp}`;
                await this.redis.set(key, tokenOtp, 'EX', ttl);
                await (0, rxjs_1.lastValueFrom)(this.kafka.emit('otp.send', {
                    email,
                    otp,
                    ts: new Date().toISOString(),
                }));
                return tokenOtp;
            });
            return { otpToken: otpToken };
        }
        catch (error) {
            console.log(error);
            const errorMessage = error instanceof common_1.HttpException ? error.getResponse() : error.message;
            const status = error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            throw new common_1.HttpException(errorMessage, status);
        }
    }
    generateOtp() {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp + '';
    }
    async verifyOtp(email, otp) {
        if (!email) {
            throw new common_1.HttpException('Email invalid', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (!user.otp || !user.otp_expiry) {
            throw new common_1.HttpException('No OTP found. Please request a new one.', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.otp_expiry < new Date()) {
            throw new common_1.HttpException('OTP expired', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.otp_attempts >= 3) {
            throw new common_1.HttpException('OTP attempts exceeded', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.otp !== otp) {
            await this.prisma.user.update({
                where: { email },
                data: { otp_attempts: { increment: 1 } },
            });
            throw new common_1.HttpException('Invalid OTP', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.prisma.user.update({
            where: { email },
            data: {
                otp_verified: true,
                otp: null,
                otp_expiry: null,
                otp_attempts: 0,
                role: roles_1.ROLES.STUDENT,
                user_verified: true,
            },
        });
        return { message: 'OTP verified successfully.' };
    }
    async getTTL(tokenEmail) {
        const ttl = await this.redis.ttl(`otp:email:${tokenEmail}`);
        if (ttl === -2) {
            throw new common_1.HttpException('Token not found', 404);
        }
        if (ttl === -1) {
            throw new common_1.HttpException('Token has no expiration', 400);
        }
        return { ttl: ttl };
    }
    async signIn(email, passwordReq) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!userExists) {
            throw new common_1.HttpException('User not found', 404);
        }
        const isMatched = await bcrypt.compare(passwordReq, userExists.password);
        if (!isMatched) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isVerified = userExists.user_verified;
        if (!isVerified) {
            throw new common_1.HttpException('Email has been registered but not verified, please verify', common_1.HttpStatus.CONFLICT);
        }
        const { publicKey: generatedPublicKey, privateKey: generatedPrivateKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });
        const { accessToken, refreshToken } = await this.jwtClient.createTokenPair(generatedPrivateKey, { id: userExists.id });
        if (!accessToken || !refreshToken) {
            throw new common_1.HttpException('Create token fail', common_1.HttpStatus.BAD_REQUEST);
        }
        const { password, otp, otp_expiry, otp_verified, otp_attempts, ...safeUser } = userExists;
        return {
            accessToken,
            refreshToken,
            user: safeUser,
        };
    }
    getSignature() {
        const imagekit = new imagekit_1.default({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
        });
        const signature = imagekit.getAuthenticationParameters();
        return signature;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('OTP_KAFKA')),
    __param(1, (0, common_1.Inject)('PRISMA_CLIENT')),
    __param(2, (0, common_1.Inject)('REDIS_CLIENT')),
    __param(3, (0, common_1.Inject)('JWT_CLIENT')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        prisma_1.PrismaClient,
        ioredis_1.default,
        jwt_1.default])
], AuthService);
//# sourceMappingURL=auth.service.js.map