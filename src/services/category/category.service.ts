import {ConflictException, Injectable} from '@nestjs/common';
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

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'category_to_product')
      .leftJoinAndSelect('category.shops', 'category_to_shop')
      .leftJoinAndSelect('category.eats', 'category_to_eats')
      .getMany();
  }

  async createOne(category: Category): Promise<Category> {
    const categoryExists = await this.categoryRepository.findOne(null, {
      where: {name: category.name},
    });
    if (categoryExists) {
      throw new ConflictException(null, 'This Category already exists!');
    }
    const newCategory = await this.categoryRepository.create({...category});
    return this.categoryRepository.save(newCategory);
  }

  async deleteOne(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOneOrFail(id);
      return await this.categoryRepository.remove(category);
    } catch (error) {
      throw new ConflictException(null, "This Category doesn't exist!");
    }
  }

  async deleteAll(): Promise<void> {
    await this.categoryRepository
      .createQueryBuilder()
      .delete()
      .from(Category)
      .execute();
  }
}
