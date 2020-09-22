import { IsNotEmpty } from 'class-validator';

export class UpdateMenuDto
{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    restaurantName: string;
}