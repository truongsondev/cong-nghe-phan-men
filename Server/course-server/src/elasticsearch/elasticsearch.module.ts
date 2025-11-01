import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticService } from './elasticsearch.service';
import { ElasticsearchController } from './elasticsearch.controller';

@Module({
  imports: [
    NestElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        node: config.get<string>('ELASTIC_NODE') || 'http://localhost:9200',
        auth: {
          username: config.get<string>('ELASTIC_USER') || 'elastic',
          password: config.get<string>('ELASTIC_PASS') || 'changeme',
        },
        maxRetries: 5,
        requestTimeout: 60000,
        sniffOnStart: false,
      }),
    }),
  ],
  controllers: [ElasticsearchController],
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticModule {}
