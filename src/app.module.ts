import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {join} from 'path';
import {CategoryController} from './controllers/category/category.controller';
import {CategoryService} from './services/category/category.service';
import {Category} from './entities/category.entity';
import {Veggie} from './entities/veggie.entity';
import {VeggieController} from './controllers/user/veggie.controller';
import {VeggieService} from './services/user/veggie.service';
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
    TypeOrmModule.forFeature([Category, Veggie]),
  ],
  controllers: [CategoryController, VeggieController],
  providers: [CategoryService, VeggieService],
})
export class AppModule {}
