import { Controller, Get, Post, Res } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './schema/item.schema';
import { Types } from 'mongoose';
import * as express from 'express';

@Controller('items')
export class ItemsController
{
    constructor(private itemsService: ItemsService) { }

    @Post()
    async create(): Promise<void>
    {
        const item: object = {
            name: 'Fried Rice',
            code: '',
            img: 'img3.jpg',
            price: 9.90,
            description: 'Uncle Roger approve this',
            category: 'MAIN DISH',
            order: 1,
            menu: Types.ObjectId('5f5500ea26f50147b4e0976c')
        };
        this.itemsService.create(item);
    }

    @Get()
    async findAll(): Promise<Item[]>
    {
        return this.itemsService.findAll();
    }

    // @Get('img')
    // async getImg(@Res() response: express.Response): Promise<any>
    // {
    //     response.sendFile('img1.jpg', {root: 'public'});
    // }

}