import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as _Schema } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Item extends Document
{
    @Prop()
    code: string;

    @Prop()
    name: string;

    @Prop()
    img: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    // all Caps
    @Prop()
    category: string;

    @Prop()
    menuId: string;
}

export const ItemSchema: _Schema<any> = SchemaFactory.createForClass(Item);