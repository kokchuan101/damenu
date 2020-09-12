import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Double } from 'mongodb';
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
    price: number;

    @Prop()
    description: string;

    
    // all Caps
    @Prop()
    category: string;
    
    @Prop()
    order:number;
}

export const ItemSchema: _Schema<any> = SchemaFactory.createForClass(Item);