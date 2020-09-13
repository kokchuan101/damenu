import { Controller, Get, Post, Param } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menu } from './schema/menu.schema';

@Controller('menus')
export class MenusController
{
    constructor(private menusService: MenusService) { }

    @Post()
    async create(): Promise<void>
    {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const item: object = {
            name: 'ppge',
            restaurantName: 'abcd',
            categories: []
        };
        this.menusService.create(item);
    }

    @Get()
    async findAll(): Promise<Menu[]>
    {
        return this.menusService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Menu>
    {
        return this.menusService.findOne(id);
    }

}