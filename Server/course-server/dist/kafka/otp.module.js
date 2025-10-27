"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPModule = void 0;
const common_1 = require("@nestjs/common");
const otp_controller_1 = require("./otp.controller");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const auth_module_1 = require("../auth/auth.module");
let OTPModule = class OTPModule {
};
exports.OTPModule = OTPModule;
exports.OTPModule = OTPModule = __decorate([
    (0, common_1.Module)({
        controllers: [otp_controller_1.OtpConsumerController],
        imports: [
            auth_module_1.AuthModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'sonltute@gmail.com',
                        pass: 'ibwj rqlz zoko xplb',
                    },
                },
                defaults: {
                    from: '"No Reply" <sonltute@gmail.com>',
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: { strict: true },
                },
            }),
        ],
    })
], OTPModule);
//# sourceMappingURL=otp.module.js.map