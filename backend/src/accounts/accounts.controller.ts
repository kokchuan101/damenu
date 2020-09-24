import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guard/localAuth.guard';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/createAccount.dto';
import { LoginDto } from './dto/login.dto';

@Controller('accounts')
export class AccountsController
{
    constructor(
        private accountService: AccountsService,
        private authService: AuthService
    ) {}

    @Post()
    async create(@Body() accountDto: CreateAccountDto): Promise<void> {
        await this.accountService.create(accountDto);
    }

    @Post('reset')
    async resetPassword(@Body() accountDto: LoginDto): Promise<void> {
        await this.accountService.resetPassword(accountDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any): Promise<any>
    {
        return this.authService.login(req.user);
    }
}