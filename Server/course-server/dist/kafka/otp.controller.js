"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpConsumerController = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let OtpConsumerController = class OtpConsumerController {
    mailerService;
    kafka;
    constructor(mailerService, kafka) {
        this.mailerService = mailerService;
        this.kafka = kafka;
    }
    async handleSendOtp(message, context) {
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
            }
            catch (error) {
                if (attempts >= maxAttempts) {
                    console.error(`Failed to send OTP to ${email} after ${maxAttempts} attempts`, error);
                    this.kafka.emit('otp.send.error', {
                        email,
                    });
                }
                return null;
            }
        }
    }
    async handleSendOtpError(message, context) {
        const { email } = message;
        console.error(`Error sending OTP to ${email}. Please check the logs for details.`);
    }
};
exports.OtpConsumerController = OtpConsumerController;
__decorate([
    (0, microservices_1.MessagePattern)('otp.send'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", Promise)
], OtpConsumerController.prototype, "handleSendOtp", null);
__decorate([
    (0, microservices_1.EventPattern)('otp.send.error'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", Promise)
], OtpConsumerController.prototype, "handleSendOtpError", null);
exports.OtpConsumerController = OtpConsumerController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('OTP_KAFKA')),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        microservices_1.ClientKafka])
], OtpConsumerController);
//# sourceMappingURL=otp.controller.js.map