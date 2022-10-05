import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/schema/account.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private accountsService: AccountsService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<Account> {
        const account: Account = await this.accountsService.findOne(email);
        if (!account) {
            return null;
        }

        const passMatch: boolean = await bcrypt.compare(
            password,
            account.password
        );
        delete account.password;
        if (passMatch) {
            return account;
        }

        return null;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async login(user: any) {
        const payload: any = { username: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
            user: user
        };
    }
}
