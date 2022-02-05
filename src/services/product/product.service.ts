import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {Product} from '../../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findOneByCondition(condition: any): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail(condition);
    } catch (error) {
      throw new NotFoundException(error, "This Shop doesn't exist");
    }
  }

  async findAllBySearchTerm(searchTerm: string): Promise<Product[]> {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect(
          'product.favourites',
          'product_favourites_favourites',
        )
        .leftJoinAndSelect('product.reviews', 'review')
        .leftJoinAndSelect('product.categories', 'product_categories_category')
        .leftJoinAndSelect('product.shops', 'shop_products_product')
        .leftJoinAndSelect('product.brand', 'brand')
        .where('LOWER(product.name) like LOWER(:name)', {
          name: `%${searchTerm}%`,
        })
        .getMany();
    } catch (error) {
      throw new NotFoundException('No Products match the query');
    }
  }

  async createOne(product: Product): Promise<Product> {
    // check if Product already exists in db
    const productExists = await this.productRepository.findOne(null, {
      where: {name: product.name},
    });
    if (productExists) {
      throw new ConflictException('This Product already exists!');
    }
    // create new instance of Product and save into db
    const newProduct = await this.productRepository.create({...product});
    return this.productRepository.save(newProduct);
  }
}
