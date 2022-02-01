import {Body, Controller, Delete, Get, Post, Res} from '@nestjs/common';
import {Category} from 'src/entities/category.entity';
import {CategoryService} from '../../services/category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getAllCategories() {
    return this.categoryService.getAll();
  }

  @Post()
  createCategory(@Body() category: Category) {
    const categoryLow = {
      ...category,
      name: category.name.toLowerCase(),
    };
    return this.categoryService.createOne(categoryLow);
  }

  // ONLY FOR DEVELOPMENT
  @Delete()
  deleteCategoryById(@Body() id: string) {
    return this.categoryService.deleteOne(id);
  }

  @Delete('all')
  deleteAllCategories() {
    return this.categoryService.deleteAll();
  }
}
