import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schema/item.schema';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [MongooseModule]
})
export class ItemsModule {}