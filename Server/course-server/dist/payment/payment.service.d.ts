import { PrismaClient } from 'generated/prisma';
export declare class PaymentService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    private readonly vnp_TmnCode;
    private readonly vnp_HashSecret;
    private readonly vnp_Url;
    private readonly vnp_ReturnUrl;
    createOrderId(courseId: string, userId: string): Promise<{
        id: string;
        userId: string;
        status: string;
        courseId: string;
        enrolledAt: Date;
    }>;
    confirmEnrollment(orderId: string): Promise<{
        orderId: string;
        success: boolean;
    }>;
    buildPaymentUrl(dto: {
        courseId: string;
        amount: number;
        ipAddr: string;
        userId: string;
    }): Promise<string>;
    sortObject(obj: any): {};
    verifySignature(query: Record<string, any>): boolean;
    private formatDate;
}
