import { Module } from '@nestjs/common';
import { ItemsModule } from 'src/items/items.module';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
    imports: [ItemsModule],
    controllers: [MenusController],
    providers: [MenusService]
})
export class MenusModule {}