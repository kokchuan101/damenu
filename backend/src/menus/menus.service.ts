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

    async create(obj: object): Promise<Menu>
    {
        const createdItem: Menu = new this.menuModel(obj);
        return createdItem.save();
    }

    async findAll(): Promise<Menu[]>
    {
        const menusPromise: Promise<Menu[]> = this.menuModel.find()
            .populate({ path: 'items', options: { sort: { 'order': 1 } } })
            .exec();

        menusPromise.then(
            (menus) => 
            {
                for (let menu of menus)
                {
                    const itemsCopy: Item[] = [...menu.items];
                    let sortedItem: object = {};
                    for (let category of menu.categories)
                    {
                        let indexs: number[] = []
                        const filterItem: Item[] = itemsCopy.filter((item, index) =>
                        {
                            if (item.category === category)
                            {
                                indexs.push(index)
                                return true;
                            } else { return false }
                        });

                        // remove filtered element
                        indexs.forEach((index) => itemsCopy.splice(index, 1))

                        sortedItem[category] = filterItem;
                    }
                    menu.sortedItems = sortedItem;
                }
            }
        )

        return menusPromise;
    }

    async findOne(id: string): Promise<Menu>
    {
        const menuPromise: Promise<Menu> = this.menuModel.findById(id)
            .populate({ path: 'items', options: { sort: { 'order': 1 } } })
            .exec();

        menuPromise.then(
            (menu) =>
            {
                const itemsCopy: Item[] = [...menu.items];
                let sortedItem: object = {};
                for (let category of menu.categories)
                {
                    let indexs: number[] = []
                    const filterItem: Item[] = itemsCopy.filter((item, index) =>
                    {
                        if (item.category === category)
                        {
                            indexs.push(index)
                            return true;
                        } else { return false }
                    });

                    // remove filtered element
                    indexs.forEach((index) => itemsCopy.splice(index, 1))

                    sortedItem[category] = filterItem;
                }
                menu.sortedItems = sortedItem;
            }
        );

        return menuPromise;
    }
}
