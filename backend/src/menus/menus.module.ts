import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/accounts/schema/account.schema';
import { ItemsModule } from 'src/items/items.module';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
    imports: [ItemsModule, MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
    controllers: [MenusController],
    providers: [MenusService]
})
export class MenusModule {}