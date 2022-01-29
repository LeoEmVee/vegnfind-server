import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../database/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoriesService {
  constructor( 
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
