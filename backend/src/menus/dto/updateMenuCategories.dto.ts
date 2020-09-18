import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateMenuCategoriesDto
{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsArray()
    categories: Array<string>;
}