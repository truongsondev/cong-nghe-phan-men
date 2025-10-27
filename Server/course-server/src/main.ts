import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ResponseInterceptor } from './common/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
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
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
