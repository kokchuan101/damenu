import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Item } from 'src/items/schema/item.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Menu extends Document
{
    @Prop()
    name: string;

    @Prop()
    restaurantName: string;

    @Prop({ default: [] })
    categories: string[];

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Item.name, default: [] }])
    items: Item[];

    @Prop()
    // eslint-disable-next-line @typescript-eslint/ban-types
    sortedItems: object;
}

export const MenuSchema: MongooseSchema<any> = SchemaFactory.createForClass(Menu);
