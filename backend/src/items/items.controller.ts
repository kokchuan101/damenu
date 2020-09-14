import { Controller, Get, Post } from '@nestjs/common';
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
        // eslint-disable-next-line @typescript-eslint/ban-types
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