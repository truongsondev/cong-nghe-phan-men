"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const microservices_1 = require("@nestjs/microservices");
const kafkajs_1 = require("kafkajs");
const db_module_1 = require("../db/db.module");
const jwt_module_1 = require("../jwt/jwt.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        imports: [
            jwt_module_1.JwtModule,
            db_module_1.DbModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'OTP_KAFKA',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'auth-service',
                            brokers: ['localhost:9092'],
                            logLevel: kafkajs_1.logLevel.INFO,
                        },
                        consumer: {
                            groupId: 'auth-service-consumer',
                            allowAutoTopicCreation: true,
                        },
                        producer: {
                            createPartitioner: kafkajs_1.Partitioners.LegacyPartitioner,
                        },
                    },
                },
            ]),
        ],
        exports: [microservices_1.ClientsModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map