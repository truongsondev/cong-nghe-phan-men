export declare class MinioService {
    private readonly minioClient;
    constructor();
    uploadFile(bucketName: string, file: Express.Multer.File): Promise<string>;
    getPresignedUrl(bucketName: string, objectName: string, expiry?: number): Promise<string>;
}
