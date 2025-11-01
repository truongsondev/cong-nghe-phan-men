import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Inject } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
  ClientKafka,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class OtpConsumerController {
  constructor(
    private readonly mailerService: MailerService,
    @Inject('OTP_KAFKA') private readonly kafka: ClientKafka,
  ) {}

  @MessagePattern('otp.send')
  async handleSendOtp(@Payload() message: any, @Ctx() context: KafkaContext) {
    const { email, otp, ts } = message;
    let attempts = 0;
    console.log(`Sending OTP to ${email}: ${otp} at ${ts}`);
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        attempts++;
        await this.mailerService.sendMail({
          to: email,
          subject: 'Mã OTP đăng ký của bạn',
          text: `Mã OTP của bạn là: ${otp} (tạo lúc ${ts})`,
          html: `<p>Mã OTP của bạn là: <b>${otp}</b></p><p>Thời gian: ${ts}</p>`,
        });
        console.log(`OTP sent successfully to ${email}`);
        return { success: true, email };
      } catch (error) {
        if (attempts >= maxAttempts) {
          console.error(
            `Failed to send OTP to ${email} after ${maxAttempts} attempts`,
            error,
          );
          this.kafka.emit('otp.send.error', {
            email,
          });
        }
        return null;
      }
    }
  }

  @EventPattern('otp.send.error')
  async handleSendOtpError(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const { email } = message;
    console.error(
      `Error sending OTP to ${email}. Please check the logs for details.`,
    );
  }
}
