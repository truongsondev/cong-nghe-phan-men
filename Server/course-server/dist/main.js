"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const response_interceptor_1 = require("./common/response/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.connectMicroservice({
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: 'otp-service',
                brokers: [`${process.env.KAFKA_BROKER || 'localhost:9092'}`],
            },
            consumer: {
                groupId: 'otp-consumer-group',
            },
        },
    });
    app.enableCors();
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    await app.startAllMicroservices();
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map