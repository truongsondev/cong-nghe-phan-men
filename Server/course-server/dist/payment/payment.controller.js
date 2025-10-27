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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPayment(req, body) {
        const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const cleanedIp = ipAddr
            ?.toString()
            .split(',')[0]
            .trim()
            .replace('::1', '127.0.0.1');
        const url = this.paymentService.buildPaymentUrl({
            courseId: body.courseId,
            amount: body.amount,
            ipAddr: cleanedIp,
            userId: body.userId,
        });
        return url;
    }
    async vnpayReturn(query) {
        const valid = this.paymentService.verifySignature(query);
        if (valid && query.vnp_ResponseCode === '00') {
            return {
                success: true,
                orderId: query.vnp_TxnRef,
            };
        }
        return {
            success: false,
            orderId: query.vnp_TxnRef,
        };
    }
    async vnpayIpn(body, res) {
        const valid = this.paymentService.verifySignature(body);
        if (valid && body.vnp_ResponseCode === '00') {
            return await this.paymentService.confirmEnrollment(body.vnp_TxnRef);
        }
        return res.json({ RspCode: '97', Message: 'Invalid Signature' });
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('vnpay-return'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "vnpayReturn", null);
__decorate([
    (0, common_1.Post)('vnpay-ipn'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "vnpayIpn", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map