import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from '../../application/use-cases/auth-user.use-case';
import { Result } from '../../shared/core/Result';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly loginUserUseCase: LoginUseCase,
        private readonly jwtService: JwtService,
    ) { }

    public async authenticate(loginDto: LoginDto): Promise<Result<AuthResponseDto>> {
        const result = await this.loginUserUseCase.execute({
            email: loginDto.email,
            password: loginDto.password,
        });

        if (result.isFailure) {
            return Result.fail(result.error!);
        }

        const user = result.getValue();

        const accessTokenPayload = { sub: user?.id, email: user?.email, type: user?.type.getValue() };
        const accessToken = this.jwtService.sign(accessTokenPayload, { expiresIn: process.env.JWT_TOKEN_TIME });

        const refreshTokenPayload = { sub: user?.id };
        const refreshToken = this.jwtService.sign(refreshTokenPayload, { expiresIn: process.env.JWT_REFRESH_TOKEN_TIME });

        const decodedAccessToken: any = this.jwtService.decode(accessToken);
        const expiresIn = decodedAccessToken.exp;

        return Result.ok({
            accessToken,
            expiresIn,
            refreshToken,
            tokenType: 'Bearer',
            user: {
                id: user!.id,
                email: user!.email.getValue(),
                type: user!.type.getValue(),
            },
        });
    }
}