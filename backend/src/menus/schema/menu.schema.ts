import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Item } from 'src/items/schema/item.schema';

@Schema()
export class Menu extends Document
{
    @Prop()
    name: string;

    @Prop()
    restaurantName: string;

    @Prop()
    categories: string[];

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Item.name}])
    items: Item[];
}

export const MenuSchema: MongooseSchema<any> = SchemaFactory.createForClass(Menu);
