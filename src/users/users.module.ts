import { Module } from '@nestjs/common';
import { User } from './entitites/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UsersController } from './users.controller';
import { UsersController } from './users.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, UsersController],
})
export class UsersModule {}
