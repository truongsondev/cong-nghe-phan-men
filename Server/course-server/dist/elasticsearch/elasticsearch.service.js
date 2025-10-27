"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let ElasticService = class ElasticService {
    elastic;
    constructor(elastic) {
        this.elastic = elastic;
    }
    async index(index, id, body) {
        return this.elastic.index({
            index,
            id,
            document: body,
        });
    }
    async search(index, query) {
        const result = await this.elastic.search({
            index,
            query,
        });
        return result.hits.hits.map((h) => h._source);
    }
    async delete(index, id) {
        return this.elastic.delete({ index, id });
    }
    async update(index, id, doc) {
        return this.elastic.update({
            index,
            id,
            doc,
        });
    }
    async ping() {
        try {
            const result = await this.elastic.ping();
            console.log('Elasticsearch connected:', result);
            return true;
        }
        catch (error) {
            console.error('Elasticsearch connection failed:', error);
            return false;
        }
    }
};
exports.ElasticService = ElasticService;
exports.ElasticService = ElasticService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
], ElasticService);
//# sourceMappingURL=elasticsearch.service.js.map