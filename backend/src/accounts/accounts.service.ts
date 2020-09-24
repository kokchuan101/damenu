import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/createAccount.dto';
import { Account } from './schema/account.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AccountsService
{
    constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

    async findOne(email: string): Promise<Account>
    {
        return this.accountModel.findOne({ 'email': email }).exec();
    }

    async create(accountDto: CreateAccountDto): Promise<any>
    {
        const account: Account = await this.findOne(accountDto.email);

        if (account) {
            throw new BadRequestException(['Email has been taken. Please try another email.']);
        } else {
            const account: Account = new this.accountModel();
            account.name = accountDto.name;
            account.email = accountDto.email;
            account.password = await bcrypt.hash(accountDto.password, 5);
            return account.save();
        }
    }

    async resetPassword(accountDto: LoginDto): Promise<any>
    {
        const account: Account = await this.findOne(accountDto.email);

        if (account)
        {
            account.password = await bcrypt.hash(accountDto.password, 5);
            return account.save();
        } else
        {
            throw new BadRequestException(['Account not found']);
        }
    }
}