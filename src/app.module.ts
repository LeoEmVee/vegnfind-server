import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {join} from 'path';
import {CategoryController} from './controllers/category/category.controller';
import {CategoryService} from './services/category/category.service';
import {Category} from './entities/category.entity';
import config from './ormconfig';
import {User} from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'ec2-34-242-89-204.eu-west-1.compute.amazonaws.com',
    //   port: 5432,
    //   username: 'uyvynvmcnbgtlg',
    //   password:
    //     'fdf1b468e401c8ec67771685d24d8b77ddb1a6b043577f09784e2d1f4e347dac',
    //   database: 'd1on1iijudtup5',
    //   synchronize: true,
    //   entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    //   ssl: true,
    //   extra: {
    //     ssl: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    // }),
    TypeOrmModule.forFeature([Category, User]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class AppModule {}
