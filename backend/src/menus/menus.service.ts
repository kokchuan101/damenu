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

    async create(createMenuDto: CreateMenuDto): Promise<void>
    {
        const { userId, ...result }: { userId: string; } = createMenuDto;

        const createdMenu: Menu = new this.menuModel(result);
        const menu: Menu = await createdMenu.save();

        this.accountModel.findByIdAndUpdate(userId, { '$push': { 'menus': menu.id } }).exec();
    }

    async update(updateMenuDto: UpdateMenuDto): Promise<void>
    {
        const { id, ...result }: { id: string; } = updateMenuDto;
        this.menuModel.updateOne({ '_id': id }, result).exec();
    }

    async delete(id: string): Promise<void>
    {
        this.menuModel.findByIdAndDelete(id).exec();
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
            indexs.forEach((index: number) => itemsCopy.splice(index, 1));

            sortedItem[category] = filterItem;
        }

        return sortedItem;
    }

    async findOne(id: string): Promise<Menu>
    {
        const menuPromise: Promise<Menu> = this.menuModel.findById(id)
            .populate({ path: 'items', options: { sort: { 'code': 1 } } })
            .exec();

        menuPromise.then(
            (menu: Menu) =>
            {
                menu.sortedItems = this.transformMenuItems(menu);
            }
        );

        return menuPromise;
    }

    async deleteCategory(id: string, category: string): Promise<void>
    {
        this.menuModel.findById(id)
            .select({ 'items': 1, 'categories': 1 })
            .populate(
                {
                    path: 'items',
                    select: '_id',
                    match: { 'category': category }
                })
            .exec()
            .then((menu: Menu) =>
            {
                const itemId: string[] = menu.items.reduce((acc: string[], item: Item) =>
                {
                    return acc.concat([item._id]);
                }, []);

                this.itemModel.find({ '_id': { '$in': itemId } })
                    .select('img')
                    .exec()
                    .then((items: Item[]) =>
                    {
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
                        this.itemModel.deleteMany({ '_id': { '$in': itemId } }).exec();
                    });

                //remove item ref and category from menu
                menu.updateOne({
                    '$pull':
                        { 'categories': category, 'items': { '$in': itemId } }
                }).exec();
            });
    }

    async updateCategories(data: UpdateMenuCategoriesDto): Promise<void>
    {
        const id: string = data.id;
        delete data.id;

        this.menuModel.updateOne(
            { '_id': id },
            { 'categories': data.categories }
        ).exec();
    }
}
