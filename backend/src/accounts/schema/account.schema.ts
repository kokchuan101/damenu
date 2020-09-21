import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Menu } from 'src/menus/schema/menu.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Account extends Document
{
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Menu.name, default: [] }])
    menus: Menu[];
}

export const AccountSchema: MongooseSchema<any> = SchemaFactory.createForClass(Account);
