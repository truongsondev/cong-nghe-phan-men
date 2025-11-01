import { Module } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();
@Module({
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useValue: prisma,
    },
  ],
  exports: ['PRISMA_CLIENT'],
})
export class DbModule {}
