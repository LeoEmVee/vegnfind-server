import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { Category } from './database/category.entity';
import config from './ormconfig';


@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class AppModule {}
