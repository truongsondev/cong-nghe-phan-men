import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [DbModule],
})
export class AdminModule {}
