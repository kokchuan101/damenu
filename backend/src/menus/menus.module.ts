import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/items/schema/item.schema';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { Menu, MenuSchema } from './schema/menu.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Menu.name, schema: MenuSchema },
        { name: Item.name, schema: ItemSchema }
    ])],
    controllers: [MenusController],
    providers: [MenusService]
})
export class MenusModule {}