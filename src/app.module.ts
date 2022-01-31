import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {join} from 'path';
import {CategoryController} from './controllers/category/category.controller';
import {CategoryService} from './services/category/category.service';
import {Category} from './entities/category.entity';
import {User} from './entities/user.entity';
require('dotenv').config();

@Module({
  imports: [
    // TypeOrmModule.forRoot(config),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
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
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class AppModule {}
