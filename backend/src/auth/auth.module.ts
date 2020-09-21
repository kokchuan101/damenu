import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
    imports: [
        forwardRef(() => AccountsModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' }
        })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule { }