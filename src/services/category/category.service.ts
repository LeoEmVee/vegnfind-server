import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {response} from 'express';
import {Category} from 'src/entities/category.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async insert(category: Category): Promise<any> {
    await this.categoryRepository.save(category);
  }

  async deleteByName(data: Category): Promise<void> {
    await this.categoryRepository
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where('name = :name', {name: data.name})
      .execute();
  }
}
