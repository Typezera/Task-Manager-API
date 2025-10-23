import {
  Controller,
  //Get,
  Post,
  Body,
  //Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  //HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user_dto';
import { ReadUserDto } from './dto/read_user_dto';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const createdUser: User = await this.usersService.create(createUserDto);

    return plainToInstance(ReadUserDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }
}
