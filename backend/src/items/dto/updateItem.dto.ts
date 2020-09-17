import { IsDecimal, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateItemDto
{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    menuId: string;

    img: string;

    @IsNotEmpty()
    @MaxLength(4)
    code: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsDecimal({decimal_digits: '2,2'})
    price: number;

    description: string;
}