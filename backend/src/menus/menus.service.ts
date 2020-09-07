import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './schema/menu.schema';
import { Item } from '../items/schema/item.schema';

@Injectable()
export class MenusService
{
    constructor(
        @InjectModel(Menu.name) private menuModel: Model<Menu>
    ) {}

    async create(obj: object): Promise<Menu>
    {
        const createdItem: Menu = new this.menuModel(obj);
        return createdItem.save();
    }

    async findAll(): Promise<Menu[]>
    {
        return this.menuModel.find()
                .populate('items')
                .exec();
    }
}
