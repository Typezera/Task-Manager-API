import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK) // <- retorno 200 ok
  @ApiOperation({ summary: 'Login do usuário e retona o JWT valido por 60m' })
  @ApiBody({ type: AuthCredentialsDto })
  @ApiOkResponse({
    description: 'Sucesso, retorna o access_token',
    schema: {
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: { email: { type: 'string' }, sub: { type: 'string' } },
        },
      },
    },
  })
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.authService.validateUser(
      authCredentialsDto.email,
      authCredentialsDto.password,
    );

    if (!user) {
      throw new UnauthorizedException(
        'Credenciais inválidas, verifique os dados inseridos!',
      );
    }

    return this.authService.login(user);
  }
}
