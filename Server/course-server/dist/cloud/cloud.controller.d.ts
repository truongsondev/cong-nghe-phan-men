import { CloudService } from './cloud.service';
export declare class CoursesController {
    private readonly cloudService;
    constructor(cloudService: CloudService);
    deleteFile(fileId: {
        fileId: string[];
    }): {
        message: string;
    };
}
