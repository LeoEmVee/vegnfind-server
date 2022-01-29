import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoriesService {
  constructor( 
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createTest(body): Promise<Category> {
    return await this.categoryRepository.save(body); 
  }
}
