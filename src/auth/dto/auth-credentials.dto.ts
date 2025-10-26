import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    description: 'Seu e-mail',
    example: 'teste@teste.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha para login.',
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}
