import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  Patch,
  //HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user_dto';
import { ReadUserDto } from './dto/read_user_dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { plainToInstance } from 'class-transformer';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsSelfGuard } from 'src/auth/is-self.guard';

// @UseInterceptors(ClassSerializerInterceptor)
@ApiSecurity('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const createdUser: User = await this.usersService.create(createUserDto);

    return plainToInstance(ReadUserDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async getAllUsers(): Promise<ReadUserDto[]> {
    const allUsers: User[] = await this.usersService.findAll();

    if (!allUsers || allUsers.length === 0) {
      throw new NotFoundException(`Nenhum usuário cadastrado!.`);
    }

    return plainToInstance(ReadUserDto, allUsers, {
      excludeExtraneousValues: true,
    });
  }

  @Get('search/:searchEmail')
  async getUserByEmail(
    @Param('searchEmail') searchString: string,
  ): Promise<ReadUserDto> {
    const userByEmail: User | undefined =
      await this.usersService.findOneByEmail(searchString);

    if (!userByEmail) {
      throw new NotFoundException(`Erro: Email ${userByEmail} não cadastrado.`);
    }

    return plainToInstance(ReadUserDto, userByEmail, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, IsSelfGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReadUserDto> {
    const updatUser = await this.usersService.update(id, updateUserDto);

    return plainToInstance(ReadUserDto, updatUser, {
      excludeExtraneousValues: true,
    });
  }
}
