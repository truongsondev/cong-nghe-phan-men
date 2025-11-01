import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: Number(process.env.MINIO_PORT) || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    });
  }

  async uploadFile(bucketName: string, file: Express.Multer.File) {
    const objectName = `${Date.now()}-${file.originalname}`;
    await this.minioClient.putObject(bucketName, objectName, file.buffer);
    return objectName; // lưu tên object vào DB
  }

  async getPresignedUrl(
    bucketName: string,
    objectName: string,
    expiry = 60 * 60,
  ) {
    return await this.minioClient.presignedGetObject(
      bucketName,
      objectName,
      expiry,
    );
  }
}
