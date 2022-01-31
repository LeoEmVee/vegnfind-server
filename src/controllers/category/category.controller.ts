import {Body, Controller, Delete, Get, Post, Res} from '@nestjs/common';
import {Category} from 'src/entities/category.entity';
import {CategoryService} from '../../services/category/category.service';
import {Response} from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() data: Category) {
    const category = new Category();
    category.name = data.name;
    return this.categoryService.insert(category);
  }

  @Delete()
  deleteById(@Body() id: string) {
    return this.categoryService.deleteAll(id);
  }
}
