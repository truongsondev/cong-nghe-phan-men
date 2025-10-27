import ImageKit from 'imagekit';
export declare class CloudService {
    imageKit: ImageKit;
    deleteFile(fileId: string): Promise<any>;
}
