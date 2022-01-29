import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { CategoriesService } from './categories.service';


@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getHello(): string {
    return this.categoriesService.getHello();
  }

  @Post()
  postTest(@Body() body: string): Promise<Category> {
    return this.categoriesService.createTest(body);
  }
}
