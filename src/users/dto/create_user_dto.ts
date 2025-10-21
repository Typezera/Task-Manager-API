/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'name field is mandatory!' })
  @IsNotEmpty({ message: 'Informe um nome!' })
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Campo obrigatorio' })
  email: string;

  @IsString({ message: 'The Password field is mandatory!' })
  @IsNotEmpty({ message: 'Campo obrigatorio' })
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @Matches(/^\+?[0-9\s-]{8,15}$/, {
    message: 'O número de telefone é invalido!',
  })
  phone?: string;

  //   @Exclude()
  //   password: string;
}
