import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto
{
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    restaurantName: string;
}