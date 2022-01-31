import {Body, Controller, Delete, Get, Post, Res} from '@nestjs/common';
import {Category} from 'src/entities/category.entity';
import {CategoryService} from '../../services/category/category.service';

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
  deleteAll() {
    return this.categoryService.deleteAllRows();
  }
}
