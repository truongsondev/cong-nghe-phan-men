import { ElasticsearchService } from '@nestjs/elasticsearch';
export declare class ElasticService {
    private readonly elastic;
    constructor(elastic: ElasticsearchService);
    index(index: string, id: string, body: any): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    search(index: string, query: any): Promise<unknown[]>;
    delete(index: string, id: string): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    update(index: string, id: string, doc: any): Promise<import("@elastic/elasticsearch/lib/api/types").UpdateResponse<unknown>>;
    ping(): Promise<boolean>;
}
