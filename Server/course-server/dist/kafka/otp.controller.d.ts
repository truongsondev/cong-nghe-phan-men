import { MailerService } from '@nestjs-modules/mailer';
import { KafkaContext, ClientKafka } from '@nestjs/microservices';
export declare class OtpConsumerController {
    private readonly mailerService;
    private readonly kafka;
    constructor(mailerService: MailerService, kafka: ClientKafka);
    handleSendOtp(message: any, context: KafkaContext): Promise<{
        success: boolean;
        email: any;
    } | null | undefined>;
    handleSendOtpError(message: any, context: KafkaContext): Promise<void>;
}
