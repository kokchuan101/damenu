import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schema/item.schema';

@Injectable()
export class ItemsService
{
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

    async create(obj: object): Promise<Item>
    {
        const createdItem: Item = new this.itemModel(obj);
        return createdItem.save();
    }

    async findAll(): Promise<Item[]>
    {
        return this.itemModel.find().exec();
    }
}
