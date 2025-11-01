import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('create')
  async createPayment(@Req() req, @Body() body) {
    const ipAddr =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const cleanedIp = ipAddr
      ?.toString()
      .split(',')[0]
      .trim()
      .replace('::1', '127.0.0.1');
    const url = this.paymentService.buildPaymentUrl({
      courseId: body.courseId,
      amount: body.amount,
      ipAddr: cleanedIp as string,
      userId: body.userId,
    });
    return url;
  }

  @Get('vnpay-return')
  @HttpCode(200)
  async vnpayReturn(@Query() query) {
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

  @Post('vnpay-ipn')
  async vnpayIpn(@Body() body, @Res() res) {
    const valid = this.paymentService.verifySignature(body);
    if (valid && body.vnp_ResponseCode === '00') {
      return await this.paymentService.confirmEnrollment(body.vnp_TxnRef);
    }
    return res.json({ RspCode: '97', Message: 'Invalid Signature' });
  }
}
