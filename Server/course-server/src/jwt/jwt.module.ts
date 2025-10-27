import { Module } from '@nestjs/common';
import JWTClient from './jwt';

export const JWT_CLIENT = 'JWT_CLIENT';

@Module({
  providers: [
    {
      provide: JWT_CLIENT,
      useClass: JWTClient,
    },
  ],
  exports: [JWT_CLIENT],
})
export class JwtModule {}
