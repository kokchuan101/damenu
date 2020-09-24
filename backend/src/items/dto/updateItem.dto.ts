import { IsDecimal, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateItemDto } from './createItem.dto';

export class UpdateItemDto extends CreateItemDto
{
    @IsNotEmpty()
    id: string;
}