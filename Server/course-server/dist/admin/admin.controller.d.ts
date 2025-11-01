import { AdminService } from './admin.service';
import { DashboardResponse } from 'src/dto/response/dashboard.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboard(): Promise<DashboardResponse>;
}
