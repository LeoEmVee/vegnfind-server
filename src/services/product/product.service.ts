import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Product} from '../../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findOneByCondition(condition: any): Promise<Product> {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.favourites', 'favourites_to_product')
        .leftJoinAndSelect('product.categories', 'category_to_product')
        .leftJoinAndSelect('product.shops', 'shop_to_product')
        .leftJoinAndSelect('product.reviews', 'review')
        .leftJoinAndSelect('product.brand', 'brand')
        .where(condition)
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(error, "This Product doesn't exist");
    }
  }

  async findAllBySearchTerm(searchTerm: string): Promise<Product[]> {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.favourites', 'favourites_products_product')
        .leftJoinAndSelect('product.categories', 'category_products_product')
        .leftJoinAndSelect('product.shops', 'shop_products_product')
        .leftJoinAndSelect('product.reviews', 'review')
        .leftJoinAndSelect('product.brand', 'brand')
        .where('LOWER(product.name) like LOWER(:name)', {
          name: `%${searchTerm}%`,
        })
        .orderBy('product.name', 'ASC')
        .getMany();
    } catch (error) {
      throw new BadRequestException(error, 'Incorrect find condition.');
    }
  }

  async createOne(product: Product): Promise<Product> {
    // check if Product already exists in db
    const productExists = await this.productRepository.findOne(null, {
      where: {name: product.name},
    });
    if (productExists) {
      throw new ConflictException(
        productExists,
        'This Product already exists!',
      );
    }
    // create new instance of Product and save into db
    const newProduct = await this.productRepository.create({...product});
    return this.productRepository.save(newProduct);
  }

  async deleteOneByCondition(condition: any): Promise<Product> {
    try {
      const product = await this.findOneByCondition(condition);
      return await this.productRepository.remove(product);
    } catch (error) {
      throw new NotFoundException(error, "Couldn't delete, entry not found.");
    }
  }

  async dropTable(): Promise<any> {
    return await this.productRepository.query(
      'DROP TABLE favourites_shopping_shop CASCADE',
    );
  }
}
