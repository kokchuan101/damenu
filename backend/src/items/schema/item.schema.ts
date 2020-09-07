import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as _Schema, Types} from 'mongoose';

@Schema()
export class Item extends Document
{
    @Prop()
    code: string;

    @Prop()
    name: string;

    @Prop()
    img: string;

    @Prop()
    description: string;

    @Prop()
    category: string;
}

export const ItemSchema: _Schema<any> = SchemaFactory.createForClass(Item);