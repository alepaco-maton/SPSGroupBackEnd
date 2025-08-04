import { DeleteUserUseCase } from "../../application/use-cases/delete-user.use-case";
import { GetUsersUseCase } from "../../application/use-cases/get-user.use-case";
import { UpdateUserUseCase } from "../../application/use-cases/update-user.use-case";
import {
    Controller,
    Delete,
    Get,
    Put,
    Param,
    Body,
    Res,
    UseGuards,
    HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { handleError } from "../../infrastructure/error/handle-error.error";
import { CustomHttpException } from "../../infrastructure/error/custom-http.exception";
import { UpdateUserDto } from "../dto/update-user.dto";
import { HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserResponseDto } from "../dto/user-response.dto";
import { GlobalExceptionResponseDto } from "../dto/global-exception-response.dto";
import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";
import { CreateUserDto } from "../dto/create-user.dto";

@ApiTags('Usuarios')
@Controller('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(
        private readonly registerUserUseCase: CreateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly getUsersUseCase: GetUsersUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase
    ) { }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Registro de usuario',
        description: 'Registro de usuario.',
    })
    @ApiBody({
        description: 'Datos de usuario a registrar.',
        type: CreateUserDto,
        required: true,
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Registro exitoso.'
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
    async register(@Body() body: CreateUserDto) {
        const result = await this.registerUserUseCase.execute({
            name: body.name,
            email: body.email,
            password: body.password,
            type: body.type,
        });

        if (result.isFailure) {
            const { errorCode, message, statusCode } = handleError(result.error!);
            throw new CustomHttpException(errorCode, message, statusCode);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Eliminar un usuario',
        description: 'Elimina un usuario por su ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID del usuario a eliminar',
        type: 'string',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'El usuario fue eliminado correctamente.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Usuario no encontrado.',
        type: GlobalExceptionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Acceso no autorizado.',
        type: GlobalExceptionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Servicio en mantenimiento, intente mas tarde.',
        type: GlobalExceptionResponseDto,
    })
    async delete(@Param('id') id: string, @Res() res: Response) {
        const result = await this.deleteUserUseCase.execute(id);

        if (result.isFailure) {
            const { errorCode, message, statusCode } = handleError(result.error!);
            throw new CustomHttpException(errorCode, message, statusCode);
        }

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Get()
    @ApiOperation({
        summary: 'Obtener todos los usuarios',
        description: 'Retorna una lista de todos los usuarios registrados.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de usuarios obtenida exitosamente.',
        type: [UserResponseDto],
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Acceso no autorizado.',
        type: GlobalExceptionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Servicio en mantenimiento, intente mas tarde.',
        type: GlobalExceptionResponseDto,
    })
    async list() {
        const result = await this.getUsersUseCase.execute();

        if (result.isFailure) {
            const { errorCode, message, statusCode } = handleError(result.error!);
            throw new CustomHttpException(errorCode, message, statusCode);
        }

        const userDTOs = result.getValue().map(user => UserResponseDto.fromEntity(user));

        return userDTOs;
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Actualizar un usuario',
        description: 'Actualiza la información de un usuario por su ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID del usuario a actualizar',
        type: 'string',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiBody({
        description: 'Datos del usuario a actualizar',
        type: UpdateUserDto,
        required: true,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario actualizado exitosamente.',
        type: UserResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Usuario no encontrado.',
        type: GlobalExceptionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Datos de entrada inválidos.',
        type: GlobalExceptionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Acceso no autorizado.',
        type: GlobalExceptionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Servicio en mantenimiento, intente mas tarde.',
        type: GlobalExceptionResponseDto,
    })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
    ) {
        const result = await this.updateUserUseCase.execute(id, {
            name: body.name,
            email: body.email,
            password: body.password,
            type: body.type,
        });

        if (result.isFailure) {
            const { errorCode, message, statusCode } = handleError(result.error!);
            throw new CustomHttpException(errorCode, message, statusCode);
        }

        const userDTO = UserResponseDto.fromEntity(result.getValue());

        return userDTO;
    }

}
