import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(req: any, body: any): Promise<string>;
    vnpayReturn(query: any): Promise<{
        success: boolean;
        orderId: any;
    }>;
    vnpayIpn(body: any, res: any): Promise<any>;
}
