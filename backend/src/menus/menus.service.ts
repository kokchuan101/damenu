/* eslint-disable @typescript-eslint/typedef */
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './schema/menu.schema';
import { Item } from '../items/schema/item.schema';
import { UpdateMenuCategoriesDto } from './dto/updateMenuCategories.dto';
import * as fs from 'fs';
import * as path from 'path';
import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';
import { Account } from 'src/accounts/schema/account.schema';
import { promises } from 'dns';

@Injectable()
export class MenusService
{
    constructor(
        @InjectModel(Menu.name) private menuModel: Model<Menu>,
        @InjectModel(Item.name) private itemModel: Model<Item>,
        @InjectModel(Account.name) private accountModel: Model<Account>
    ) { }

    async findUserMenus(id: string): Promise<Menu[]>
    {
        const account: Account = await this.accountModel.findById(id).populate('menus').exec();
        return account.menus;
    }

    async create(createMenuDto: CreateMenuDto): Promise<any>
    {
        const createdMenu: Menu = new this.menuModel(createMenuDto);
        const menu: Menu = await createdMenu.save();

        return this.accountModel.findByIdAndUpdate(menu.accountId, { '$push': { 'menus': menu.id } }).exec();
    }

    async update(updateMenuDto: UpdateMenuDto): Promise<any>
    {
        const { id, ...result }: { id: string; } = updateMenuDto;
        return this.menuModel.updateOne({ '_id': id }, result).exec();
    }

    async delete(id: string): Promise<any>
    {
        const menu: Menu = await this.menuModel.findByIdAndDelete(id).exec();

        const itemId: string[] = menu.items.reduce((acc: string[], item: Item) =>
        {
            return acc.concat([item._id]);
        }, []);

        const deleteFromAccount: Promise<Account> = this.accountModel.findByIdAndUpdate(menu.accountId, { '$pull': { 'menus': menu.id  } }).exec();

        const deleteItems: Promise<any> = this.deleteItems(itemId);

        return Promise.all([deleteFromAccount, deleteItems]);
    }

    async findOne(id: string): Promise<Menu>
    {
        const menu: Menu = await this.menuModel.findById(id)
            .populate({ path: 'items', options: { sort: { 'code': 1 } } })
            .exec();

        menu.sortedItems = this.transformMenuItems(menu);

        return menu;
    }

    async deleteCategory(id: string, category: string): Promise<any>
    {
        const menu: Menu = await this.menuModel.findById(id)
            .select({ 'items': 1, 'categories': 1 })
            .populate(
                {
                    path: 'items',
                    select: '_id',
                    match: { 'category': category }
                })
            .exec();

        const itemId: string[] = menu.items.reduce((acc: string[], item: Item) =>
        {
            return acc.concat([item._id]);
        }, []);

        await this.deleteItems(itemId);

        //remove item ref and category from menu
        return menu.updateOne({
            '$pull':
                { 'categories': category, 'items': { '$in': itemId } }
        }).exec();
    }

    async updateCategories(data: UpdateMenuCategoriesDto): Promise<any>
    {
        const id: string = data.id;
        delete data.id;

        return this.menuModel.updateOne(
            { '_id': id },
            { 'categories': data.categories }
        ).exec();
    }

    async deleteItems(itemId: string[]): Promise<any>
    {
        const items: Item[] = await this.itemModel.find({ '_id': { '$in': itemId } })
            .select('img')
            .exec();

        items.forEach((item: Item) =>
        {
            //remove all associated file
            if (item.img)
            {
                const filename: string = path.join(process.cwd(), 'public') + item.img;
                fs.promises.unlink(filename);
            }
        });

        //delete all associated item
        return this.itemModel.deleteMany({ '_id': { '$in': itemId } }).exec();
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    transformMenuItems(menu: Menu): object
    {
        const itemsCopy: Item[] = [...menu.items];
        // eslint-disable-next-line @typescript-eslint/ban-types
        const sortedItem: object = {};
        for (const category of menu.categories)
        {
            const indexs: number[] = [];
            const filterItem: Item[] = itemsCopy.filter((item: Item, index: number) =>
            {
                if (item.category === category)
                {
                    indexs.push(index);
                    return true;
                } else { return false; }
            });

            // remove filtered element
            indexs.reverse().forEach((index: number) => itemsCopy.splice(index, 1));

            sortedItem[category] = filterItem;
        }

        return sortedItem;
    }
}
