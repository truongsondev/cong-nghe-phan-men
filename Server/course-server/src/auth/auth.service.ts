import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaClient } from 'generated/prisma';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { ROLES } from 'src/enum/roles';
import Redis from 'ioredis';
import JWTClient from 'src/jwt/jwt';
import { generateKeyPairSync } from 'crypto';
import ImageKit from 'imagekit';

@Injectable()
export class AuthService {
  constructor(
    @Inject('OTP_KAFKA') private readonly kafka: ClientKafka,
    @Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    @Inject('JWT_CLIENT') private readonly jwtClient: JWTClient,
  ) {}

  async onModuleInit() {
    console.log('connecting to kafka...');
    await this.kafka.connect();
  }
  async signUp(email: string, password: string) {
    const otp = this.generateOtp();
    console.log(otp);
    try {
      const otpToken = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({ where: { email } });
        if (user && user.user_verified) {
          throw new HttpException('User already exists', HttpStatus.CONFLICT);
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
            role: ROLES.GUEST,
            otp,
            otp_expiry: new Date(Date.now() + 5 * 60 * 1000),
            password: hashedPassword,
          },
        });

        const tokenOtp = await bcrypt.hash(email, 10);
        const ttl = 60;
        const key = `otp:email:${tokenOtp}`;
        await this.redis.set(key, tokenOtp, 'EX', ttl);

        await lastValueFrom(
          this.kafka.emit('otp.send', {
            email,
            otp,
            ts: new Date().toISOString(),
          }),
        );

        return tokenOtp;
      });
      return { otpToken: otpToken };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof HttpException ? error.getResponse() : error.message;
      const status =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, status);
    }
  }

  generateOtp(): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp + '';
  }
}
