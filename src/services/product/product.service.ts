import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Product} from '../../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

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
