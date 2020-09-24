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

    async create(createItemDto: CreateItemDto, file: Express.Multer.File): Promise<any>
    {
        const createdItem: Item = new this.itemModel(createItemDto);

        const item: Item = await createdItem.save();

        const imgPromise: Array<Promise<any>> = [];
        if (file)
        {
            const ext: string[] = file.mimetype.split('/');
            item.img = `/img${item.id}.${ext[ext.length - 1]}`;
            const filename: string = path.join(process.cwd(), 'public' + item.img);

            imgPromise.push(fs.promises.writeFile(filename, file.buffer));
            imgPromise.push(item.save());
        }

        const menuUpdate: Promise<any> = this.menuModel.updateOne(
            { _id: item.menuId },
            { '$push': { 'items': item.id } }
        ).exec();

        return Promise.all([...imgPromise, menuUpdate]);
    }

    async findAll(): Promise<Item[]>
    {
        return this.itemModel.find().exec();
    }

    async delete(id: string): Promise<any>
    {
        const item: Item = await this.itemModel.findByIdAndDelete(id).exec();

        const filename: string = path.join(process.cwd(), 'public') + item.img;
        fs.promises.unlink(filename);

        return this.menuModel.updateOne(
            { id: item.menuId },
            { '$pull': { 'items': item.id } }
        ).exec();
    }

    async update(item: UpdateItemDto, file: Express.Multer.File): Promise<any>
    {
        let fileUpdate: Promise<any> = Promise.resolve();
        if (file)
        {
            const ext: string[] = file.mimetype.split('/');
            item.img = `/img${item.id}.${ext[ext.length - 1]}`;
            const filename: string = path.join(process.cwd(), 'public' + item.img);

            fileUpdate = fs.promises.writeFile(filename, file.buffer);
        }

        const { id, ...result }: { id: string; } = item;

        const itemUpdate: Promise<any> = this.itemModel.updateOne({ '_id': id }, result).exec();

        return Promise.all([itemUpdate, fileUpdate]);
    }
}