import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../auth/auth.service';
import { LoginUseCase } from '../../application/use-cases/auth-user.use-case';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_TOKEN_TIME },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LoginUseCase,
        JwtStrategy,
        JwtAuthGuard
    ],
    exports: [
        AuthModule,
        JwtAuthGuard,
    ]
})
export class AuthModule { }

