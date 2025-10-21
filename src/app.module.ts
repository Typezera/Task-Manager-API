import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseType } from './config/interfaces/config.interface';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';

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

          entities: [],
          synchronize: true,
        }) as TypeOrmModuleOptions,
    }),
    // modulos da aplicação
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
