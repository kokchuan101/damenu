import { Controller, Get, Post, Param, Body, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';
import { UpdateMenuCategoriesDto } from './dto/updateMenuCategories.dto';
import { MenusService } from './menus.service';
import { Menu } from './schema/menu.schema';

@Controller('menus')
export class MenusController
{
    constructor(private menusService: MenusService) { }

    @Get('/user/:id')
    @UseGuards(JwtAuthGuard)
    async findUserMenus(@Param('id') id: string): Promise<Menu[]>
    {
        return this.menusService.findUserMenus(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createMenuDto: CreateMenuDto): Promise<void>
    {
        this.menusService.create(createMenuDto);
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    async update(@Body() updateMenuDto: UpdateMenuDto): Promise<void>
    {
        this.menusService.update(updateMenuDto);
    }

    @Delete('categories')
    @UseGuards(JwtAuthGuard)
    async deleteCategory(@Query('id') id: string, @Query('category') category: string): Promise<void>
    {
        this.menusService.deleteCategory(id, category);
    }

    @Patch('categories')
    @UseGuards(JwtAuthGuard)
    async updateCategories(@Body() data: UpdateMenuCategoriesDto): Promise<void>
    {
        this.menusService.updateCategories(data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: string): Promise<void>
    {
        this.menusService.delete(id);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Menu>
    {
        return this.menusService.findOne(id);
    }
}
