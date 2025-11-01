import { Module } from '@nestjs/common';
import { OtpConsumerController } from './otp.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OtpConsumerController],
  imports: [
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'sonltute@gmail.com',
          pass: 'ibwj rqlz zoko xplb',
        },
      },
      defaults: {
        from: '"No Reply" <sonltute@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
  ],
})
export class OTPModule {}
