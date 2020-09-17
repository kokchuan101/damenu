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
    ) { }

    // eslint-disable-next-line @typescript-eslint/ban-types
    async create(obj: object): Promise<Menu>
    {
        const createdItem: Menu = new this.menuModel(obj);
        return createdItem.save();
    }

    async findAll(): Promise<Menu[]>
    {
        const menusPromise: Promise<Menu[]> = this.menuModel.find()
            .populate({ path: 'items', options: { sort: { 'code': 1 } } })
            .exec();

        menusPromise.then(
            (menus: Menu[]) =>
            {
                for (const menu of menus)
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
                    menu.sortedItems = sortedItem;
                }
            }
        );

        return menusPromise;
    }

    async findOne(id: string): Promise<Menu>
    {
        const menuPromise: Promise<Menu> = this.menuModel.findById(id)
            .populate({ path: 'items', options: { sort: { 'code': 1 } } })
            .exec();

        menuPromise.then(
            (menu: Menu) =>
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
                menu.sortedItems = sortedItem;
            }
        );

        return menuPromise;
    }
}
