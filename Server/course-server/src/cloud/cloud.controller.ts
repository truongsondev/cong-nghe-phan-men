import { Body, Controller, Post } from '@nestjs/common';
import { CloudService } from './cloud.service';

@Controller('cloud')
export class CoursesController {
  constructor(private readonly cloudService: CloudService) {}

  @Post('delete-file')
  deleteFile(@Body() fileId: { fileId: string[] }) {
    for (const id of fileId.fileId) {
      this.cloudService.deleteFile(id);
    }
    return {
      message: 'Files deleted successfully',
    };
  }
}
