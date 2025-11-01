import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DashboardResponse } from 'src/dto/response/dashboard.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('dashboard')
  async getDashboard(): Promise<DashboardResponse> {
    return this.adminService.getDashboard();
  }
}
