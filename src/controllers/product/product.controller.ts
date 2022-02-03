import {Body, Controller, Post} from '@nestjs/common';
import {ProductService} from 'src/services/product/product.service';
import {Product} from '../../entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('find')
  findShop(@Body() condition: any) {
    return this.productService.findOneByCondition(condition);
  }

  @Post('findall')
  findAllProducts(@Body('searchTerm') searchTerm: any) {
    return this.productService.findAllBySearchTerm(searchTerm);
  }

  @Post('create')
  createProduct(@Body() product: Product) {
    return this.productService.createOne(product);
  }
}
