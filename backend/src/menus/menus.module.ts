import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { Menu, MenuSchema } from './schema/menu.schema';
import { ItemsModule } from 'src/items/items.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }])],
    controllers: [MenusController],
    providers: [MenusService]
})
export class MenusModule {}