import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guard/jwtAuth.guard';

@Controller()
export class AppController
{
    constructor(private readonly appService: AppService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    getHello(): string
    {
        return this.appService.getHello();
    }
}
