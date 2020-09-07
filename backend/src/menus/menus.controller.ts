import { Controller, Get, Post, Body } from '@nestjs/common';
import { Types } from 'mongoose';
import { MenusService } from './menus.service';
import { Menu } from './schema/menu.schema';

@Controller('menus')
export class MenusController
{
    constructor(private menusService: MenusService) { }

    @Post()
    async create(): Promise<void>
    {
        const item: object = {
            name: "ppge",
            restaurantName: "abcd",
            categories: []
        };
        this.menusService.create(item);
    }

    @Get()
    async findAll(): Promise<Menu[]>
    {
        return this.menusService.findAll();
    }

}