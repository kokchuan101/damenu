import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto
{
    @IsNotEmpty()
    accountId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    restaurantName: string;
}