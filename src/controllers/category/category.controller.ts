import {Body, Controller, Get, Post} from '@nestjs/common';
import {Category} from 'src/entities/category.entity';
import {CategoryService} from '../../services/category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() category: Category) {
    this.categoryService
      .insert(category)
      .then(res => res)
      .catch(err => err);
  }
}
