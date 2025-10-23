import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseType } from './config/interfaces/config.interface';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // especifica o .env
    }), // configuração TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get('DB_TYPE')! as DatabaseType,
          host: configService.get('DB_HOST')!,
          port: configService.get<number>('DB_PORT')!,
          username: configService.get('DB_USERNAME')!,
          password: configService.get('DB_PASSWORD')!,
          database: configService.get('DB_DATABASE')!,

          entities: [User, Task],
          synchronize: true,
        }) as TypeOrmModuleOptions,
    }),
    // modulos da aplicação
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
