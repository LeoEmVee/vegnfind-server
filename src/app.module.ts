import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {join} from 'path';
import {CategoryController} from './controllers/category/category.controller';
import {CategoryService} from './services/category/category.service';
import {Category} from './entities/category.entity';
import {Veggie} from './entities/veggie.entity';
import {VeggieController} from './controllers/user/veggie.controller';
import {VeggieService} from './services/user/veggie.service';
import {ShopController} from './controllers/shop/shop.controller';
import {ShopService} from './services/shop/shop.service';
import {Shop} from './entities/shop.entity';
import {EatController} from './controllers/eat/eat.controller';
import {EatService} from './services/eat/eat.service';
import {Eat} from './entities/eat.entity';
import {AuthController} from './controllers/auth/auth.controller';
import {AuthService} from './services/auth/auth.service';
import {LocalStrategy} from './auth/local.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
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
    TypeOrmModule.forFeature([Category, Veggie, Shop, Eat]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {expiresIn: '3600s'},
    }),
  ],
  controllers: [
    CategoryController,
    VeggieController,
    ShopController,
    EatController,
    AuthController,
  ],
  providers: [
    CategoryService,
    VeggieService,
    ShopService,
    EatService,
    AuthService,
    LocalStrategy,
  ],
})
export class AppModule {}
