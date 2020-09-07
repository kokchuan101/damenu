import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Item } from './items/schema/item.schema';

async function bootstrap(): Promise<void>
{
    const app: INestApplication = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
