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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../../generated/prisma/index.js");
const qs = __importStar(require("qs"));
let PaymentService = class PaymentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    vnp_TmnCode = process.env.VNPAY_TMN_CODE || 'YOUR_SANDBOX_TMNCODE';
    vnp_HashSecret = process.env.VNPAY_HASH_SECRET || 'YOUR_SANDBOX_HASHSECRET';
    vnp_Url = process.env.VNPAY_URL ||
        'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    vnp_ReturnUrl = process.env.VNPAY_RETURN_URL ||
        'http://localhost:5173/payment/vnpay-return';
    async createOrderId(courseId, userId) {
        const [course, user] = await Promise.all([
            this.prisma.course.findUnique({ where: { id: courseId } }),
            this.prisma.user.findUnique({ where: { id: userId } }),
        ]);
        if (!course || !user) {
            throw new common_1.HttpException('Course or user is not valid', 400);
        }
        const order = await this.prisma.enrollment.create({
            data: {
                userId,
                courseId,
            },
        });
        return order;
    }
    async confirmEnrollment(orderId) {
        console.log('cosv ô dây');
        const isEnrolled = await this.prisma.enrollment.findFirst({
            where: {
                courseId: orderId,
                userId: orderId,
            },
        });
        if (isEnrolled) {
            if (isEnrolled.status === 'paid') {
                throw new common_1.HttpException('User already enrolled in this course', 400);
            }
        }
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { id: orderId },
        });
        if (!enrollment)
            throw new Error('Enrollment not found');
        if (enrollment.status !== 'paid') {
            await this.prisma.enrollment.update({
                where: { id: orderId },
                data: {
                    status: 'paid',
                },
            });
        }
        return {
            orderId: enrollment.id,
            success: true,
        };
    }
    async buildPaymentUrl(dto) {
        const date = new Date();
        const createDate = this.formatDate(date);
        const order = await this.createOrderId(dto.courseId, dto.userId);
        const orderInfo = `Pay for order ${order.id}`;
        const expireDate = this.formatDate(new Date(date.getTime() + 10 * 60 * 1000));
        const params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: this.vnp_TmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: order.id,
            vnp_OrderInfo: orderInfo,
            vnp_OrderType: 'billpayment',
            vnp_Amount: dto.amount * 100,
            vnp_ReturnUrl: this.vnp_ReturnUrl,
            vnp_IpAddr: dto.ipAddr,
            vnp_CreateDate: createDate,
            vnp_ExpireDate: expireDate,
            vnp_Bill_Email: 'sonltute@gmail.com',
        };
        const sortedParams = this.sortObject(params);
        const signData = qs.stringify(sortedParams, { encode: false });
        const secureHash = crypto_1.default
            .createHmac('sha512', this.vnp_HashSecret)
            .update(new Buffer(signData, 'utf-8'))
            .digest('hex');
        const paymentUrl = `${this.vnp_Url}?${signData}&vnp_SecureHash=${secureHash}`;
        return paymentUrl;
    }
    sortObject(obj) {
        const sorted = {};
        const keys = Object.keys(obj).sort();
        keys.forEach((key) => {
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, '+');
        });
        return sorted;
    }
    verifySignature(query) {
        const secureHash = query.vnp_SecureHash;
        delete query.vnp_SecureHash;
        delete query.vnp_SecureHashType;
        const sortedParams = this.sortObject(query);
        const signData = qs.stringify(sortedParams, { encode: false });
        const signed = crypto_1.default
            .createHmac('sha512', this.vnp_HashSecret)
            .update(signData)
            .digest('hex');
        return secureHash === signed;
    }
    formatDate(date) {
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        const dd = date.getDate().toString().padStart(2, '0');
        const hh = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        const ss = date.getSeconds().toString().padStart(2, '0');
        return `${yyyy}${mm}${dd}${hh}${min}${ss}`;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRISMA_CLIENT')),
    __metadata("design:paramtypes", [prisma_1.PrismaClient])
], PaymentService);
//# sourceMappingURL=payment.service.js.map