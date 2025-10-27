"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const otp_module_1 = require("./kafka/otp.module");
const db_module_1 = require("./db/db.module");
const jwt_module_1 = require("./jwt/jwt.module");
const redis_module_1 = require("./redis/redis.module");
const course_module_1 = require("./course/course.module");
const cloud_module_1 = require("./cloud/cloud.module");
const minio_module_1 = require("./minio/minio.module");
const elasticsearch_module_1 = require("./elasticsearch/elasticsearch.module");
const config_1 = require("@nestjs/config");
const payment_module_1 = require("./payment/payment.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            otp_module_1.OTPModule,
            db_module_1.DbModule,
            jwt_module_1.JwtModule,
            redis_module_1.RedisModule,
            course_module_1.CourseModule,
            cloud_module_1.CloudModule,
            minio_module_1.UploadModule,
            elasticsearch_module_1.ElasticModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            payment_module_1.PaymentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map