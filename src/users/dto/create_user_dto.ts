/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';

// configuração do swagger

export class CreateUserDto {
  @ApiProperty({
    description: 'nome completo do usuário',
    example: 'João silva',
  })
  @IsString({ message: 'name field is mandatory!' })
  @IsNotEmpty({ message: 'Informe um nome!' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joão@gmail.com',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Campo obrigatorio' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário pelo menos 6 caracteres',
    example: '123456',
  })
  @IsString({ message: 'The Password field is mandatory!' })
  @IsNotEmpty({ message: 'Campo obrigatorio' })
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Celular do usuário',
    example: '99 99999-9999',
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @Matches(/^\+?[0-9\s-]{8,15}$/, {
    message: 'O número de telefone é invalido!',
  })
  phone?: string;

  //   @Exclude()
  //   password: string;
}
