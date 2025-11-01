import { Client } from 'minio';

import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
@Module({
  providers: [MinioService],
})
export class UploadModule {}
