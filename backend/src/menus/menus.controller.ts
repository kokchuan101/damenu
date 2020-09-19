import { Controller, Get, Post, Param, Body, Patch, Delete, Query } from '@nestjs/common';
import { UpdateMenuCategoriesDto } from './dto/updateMenuCategories.dto';
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

    @Delete('categories')
    async deleteCategory(@Query('id') id: string, @Query('category') category: string): Promise<void>
    {
        return this.menusService.deleteCategory(id, category);
    }

    @Patch('categories')
    async updateCategories(@Body() data: UpdateMenuCategoriesDto): Promise<void>
    {
        this.menusService.updateCategories(data);
    }
}
