import {Body, Controller, Delete, Get, Post, Res} from '@nestjs/common';
import {Category} from 'src/entities/category.entity';
import {CategoryService} from '../../services/category/category.service';
import {Response} from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() categoryName: string) {
    const category = new Category();
    category.name = categoryName;
    const response = this.categoryService.insert(category);
    console.log('controller', response);
    return response;
  }

  @Delete()
  deleteCategory(@Body() categoryName: string) {}
}
