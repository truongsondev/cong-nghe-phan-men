import { HttpException, Inject, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { PrismaClient } from 'generated/prisma';
import * as qs from 'qs';

@Injectable()
export class PaymentService {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}
  private readonly vnp_TmnCode =
    process.env.VNPAY_TMN_CODE || 'YOUR_SANDBOX_TMNCODE';
  private readonly vnp_HashSecret =
    process.env.VNPAY_HASH_SECRET || 'YOUR_SANDBOX_HASHSECRET';
  private readonly vnp_Url =
    process.env.VNPAY_URL ||
    'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private readonly vnp_ReturnUrl =
    process.env.VNPAY_RETURN_URL ||
    'http://localhost:5173/payment/vnpay-return';

  async createOrderId(courseId: string, userId: string) {
    const [course, user] = await Promise.all([
      this.prisma.course.findUnique({ where: { id: courseId } }),
      this.prisma.user.findUnique({ where: { id: userId } }),
    ]);

    if (!course || !user) {
      throw new HttpException('Course or user is not valid', 400);
    }

    const order = await this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });

    return order;
  }

  async confirmEnrollment(orderId: string) {
    console.log('cosv ô dây');
    const isEnrolled = await this.prisma.enrollment.findFirst({
      where: {
        courseId: orderId,
        userId: orderId,
      },
    });
    if (isEnrolled) {
      if (isEnrolled.status === 'paid') {
        throw new HttpException('User already enrolled in this course', 400);
      }
    }
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: orderId },
    });

    if (!enrollment) throw new Error('Enrollment not found');

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

  async buildPaymentUrl(dto: {
    courseId: string;
    amount: number;
    ipAddr: string;
    userId: string;
  }) {
    const date = new Date();
    const createDate = this.formatDate(date);

    const order = await this.createOrderId(dto.courseId, dto.userId);
    const orderInfo = `Pay for order ${order.id}`;
    const expireDate = this.formatDate(
      new Date(date.getTime() + 10 * 60 * 1000),
    );
    const params: Record<string, any> = {
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
    const secureHash = crypto
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

  verifySignature(query: Record<string, any>): boolean {
    const secureHash = query.vnp_SecureHash;
    delete query.vnp_SecureHash;
    delete query.vnp_SecureHashType;

    const sortedParams = this.sortObject(query);

    const signData = qs.stringify(sortedParams, { encode: false });
    const signed = crypto
      .createHmac('sha512', this.vnp_HashSecret)
      .update(signData)
      .digest('hex');

    return secureHash === signed;
  }

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');
    return `${yyyy}${mm}${dd}${hh}${min}${ss}`;
  }
}
