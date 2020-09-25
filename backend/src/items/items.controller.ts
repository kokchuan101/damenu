import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './schema/item.schema';
import { CreateItemDto } from './dto/createItem.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { UpdateItemDto } from './dto/updateItem.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { imageFilter } from 'src/utils/utils.service';

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController
{
    constructor(private itemsService: ItemsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('img', { fileFilter: imageFilter }))
    async create(@UploadedFile() file: Express.Multer.File, @Body() item: CreateItemDto): Promise<void>
    {
        await this.itemsService.create(item, file);
    }

    @Get()
    async findAll(): Promise<Item[]>
    {
        return this.itemsService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void>
    {
        await this.itemsService.delete(id);
    }

    @Patch()
    @UseInterceptors(FileInterceptor('img', { fileFilter: imageFilter }))
    async update(@UploadedFile() file: Express.Multer.File, @Body() item: UpdateItemDto): Promise<void>
    {
        await this.itemsService.update(item, file);
    }

}