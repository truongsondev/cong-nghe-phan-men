import { Controller } from '@nestjs/common';
import { ElasticService } from './elasticsearch.service';

@Controller('elasticsearch')
export class ElasticsearchController {
  constructor(private readonly elasticsearchService: ElasticService) {}
}
