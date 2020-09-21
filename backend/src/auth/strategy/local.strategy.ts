import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Account } from 'src/accounts/schema/account.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService)
    {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any>
    {
        const account: Account = await this.authService.validateUser(email, password);
        if (!account)
        {
            throw new UnauthorizedException();
        }

        account.password = 'nopeknotsee';
        return account;
    }
}