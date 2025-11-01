import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';

@Injectable()
export class CloudService {
  imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
  });

  async deleteFile(fileId: string): Promise<any> {
    const result = await this.imageKit.deleteFile(fileId);
    return result;
  }
}
