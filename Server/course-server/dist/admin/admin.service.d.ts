import { PrismaClient } from 'generated/prisma';
import { DashboardResponse } from 'src/dto/response/dashboard.dto';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    getDashboard(): Promise<DashboardResponse>;
}
