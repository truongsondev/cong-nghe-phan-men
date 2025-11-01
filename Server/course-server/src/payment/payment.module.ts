import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [DbModule],
})
export class PaymentModule {}
