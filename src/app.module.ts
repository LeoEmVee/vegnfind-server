import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {join} from 'path';
import {CategoryController} from './controllers/category/category.controller';
import {CategoryService} from './services/category/category.service';
import {Category} from './entities/category.entity';
import {User} from './entities/user.entity';
import {UserController} from './controllers/user/user.controller';
import {UserService} from './services/user/user.service';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([Category, User]),
  ],
  controllers: [CategoryController, UserController],
  providers: [CategoryService, UserService],
})
export class AppModule {}
