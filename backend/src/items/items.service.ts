import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schema/item.schema';
import { CreateItemDto } from './dto/createItem.dto';
import { Menu } from 'src/menus/schema/menu.schema';
import * as path from 'path';
import * as fs from 'fs';
import { UpdateItemDto } from './dto/updateItem.dto';

@Injectable()
export class ItemsService
{
    constructor(
        @InjectModel(Item.name) private itemModel: Model<Item>,
        @InjectModel(Menu.name) private menuModel: Model<Menu>) { }

    async create(item: CreateItemDto, file: Express.Multer.File): Promise<void>
    {
        const createdItem: Item = new this.itemModel(item);

        const itemPromise: Promise<Item> = createdItem.save();

        itemPromise.then(async (item: Item) =>
        {
            if (file)
            {
                const ext: string[] = file.mimetype.split('/');
                item.img = `/img${item.id}.${ext[ext.length - 1]}`;
                const filename: string = path.join(process.cwd(), 'public' + item.img);

                fs.promises.writeFile(filename, file.buffer);
            }

            item.save();
            this.menuModel.updateOne(
                { _id: item.menuId },
                { '$push': { 'items': item.id } }
            ).exec();
        });
    }

    async findAll(): Promise<Item[]>
    {
        return this.itemModel.find().exec();
    }

    async delete(id: string): Promise<void>
    {
        const itemPromise: Promise<Item> = this.itemModel.findByIdAndDelete(id).exec();

        itemPromise.then((item: Item) =>
        {
            const filename: string = path.join(process.cwd(), 'public') + item.img;
            fs.promises.unlink(filename);
            this.menuModel.updateOne(
                { id: item.menuId },
                { '$pull': { 'items': item.id } }
            ).exec();
        });
    }

    async update(item: UpdateItemDto, file: Express.Multer.File): Promise<void>
    {
        if (file)
        {
            const ext: string[] = file.mimetype.split('/');
            item.img = `/img${item.id}.${ext[ext.length - 1]}`;
            const filename: string = path.join(process.cwd(), 'public' + item.img);

            fs.promises.writeFile(filename, file.buffer);
        }

        const { id, ...result }: { id: string; } = item;

        this.itemModel.updateOne({ '_id': id }, result).exec();
    }
}