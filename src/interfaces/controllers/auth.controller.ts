import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { handleError } from '../../infrastructure/error/handle-error.error';
import { CustomHttpException } from '../../infrastructure/error/custom-http.exception';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { GlobalExceptionResponseDto } from '../dto/global-exception-response.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login de usuario',
    description: 'Autentica a un usuario y retorna un token JWT.',
  })
  @ApiBody({
    description: 'Credenciales de login del usuario (email y contraseña).',
    type: LoginDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login exitoso. Retorna el token de acceso y la información del usuario.',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales inválidas.',
    type: GlobalExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
    type: GlobalExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Servicio en mantenimiento, intente mas tarde.',
    type: GlobalExceptionResponseDto,
  })
  async login(@Body() body: LoginDto) {
    const result = await this.service.authenticate(body);

    if (result.isFailure) {
      const { errorCode, message, statusCode } = handleError(result.error!);
      throw new CustomHttpException(errorCode, message, statusCode);
    }

    return result.getValue();
  }

}