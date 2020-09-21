import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Menu, MenuSchema } from 'src/menus/schema/menu.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account, AccountSchema } from './schema/account.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Account.name, schema: AccountSchema },
        { name: Menu.name, schema: MenuSchema }]), forwardRef(() => AuthModule)],
    controllers: [AccountsController],
    providers: [AccountsService],
    exports: [AccountsService]
})

export class AccountsModule { }