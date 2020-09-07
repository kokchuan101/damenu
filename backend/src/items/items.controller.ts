import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './schema/item.schema';
import { Types } from 'mongoose';

@Controller('items')
export class ItemsController
{
    constructor(private itemsService: ItemsService) { }

    @Post()
    async create(): Promise<void>
    {
        const item: object = {
            name: "ppge",
            code: "1",
            img: "123",
            description: "sdf",
            category: "sdffsd",
            menu: Types.ObjectId("")
        };
        this.itemsService.create(item);
    }

    @Get()
    async findAll(): Promise<Item[]>
    {
        return this.itemsService.findAll();
    }

}