import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OTPModule } from './kafka/otp.module';
import { DbModule } from './db/db.module';
import { JwtModule } from './jwt/jwt.module';
import { RedisModule } from './redis/redis.module';
import { CourseModule } from './course/course.module';
import { CloudModule } from './cloud/cloud.module';
import { UploadModule } from './minio/minio.module';
import { ElasticModule } from './elasticsearch/elasticsearch.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule,
    OTPModule,
    DbModule,
    JwtModule,
    RedisModule,
    CourseModule,
    CloudModule,
    UploadModule,
    ElasticModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
