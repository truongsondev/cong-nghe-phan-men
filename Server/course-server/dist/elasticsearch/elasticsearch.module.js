"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticModule = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const config_1 = require("@nestjs/config");
const elasticsearch_service_1 = require("./elasticsearch.service");
const elasticsearch_controller_1 = require("./elasticsearch.controller");
let ElasticModule = class ElasticModule {
};
exports.ElasticModule = ElasticModule;
exports.ElasticModule = ElasticModule = __decorate([
    (0, common_1.Module)({
        imports: [
            elasticsearch_1.ElasticsearchModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    node: config.get('ELASTIC_NODE') || 'http://localhost:9200',
                    auth: {
                        username: config.get('ELASTIC_USER') || 'elastic',
                        password: config.get('ELASTIC_PASS') || 'changeme',
                    },
                    maxRetries: 5,
                    requestTimeout: 60000,
                    sniffOnStart: false,
                }),
            }),
        ],
        controllers: [elasticsearch_controller_1.ElasticsearchController],
        providers: [elasticsearch_service_1.ElasticService],
        exports: [elasticsearch_service_1.ElasticService],
    })
], ElasticModule);
//# sourceMappingURL=elasticsearch.module.js.map