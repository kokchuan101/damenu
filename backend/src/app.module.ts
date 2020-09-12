import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { MenusModule } from './menus/menus.module';
import { join } from 'path';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/damenu'),
        ItemsModule,
        MenusModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
