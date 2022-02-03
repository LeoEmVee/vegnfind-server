import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {Shop} from 'src/entities/shop.entity';
import {ShopService} from 'src/services/shop/shop.service';
import {AuthController} from '../auth/auth.controller';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('find')
  findShop(@Body() condition: any) {
    return this.shopService.findOneByCondition(condition);
  }

  @Post('findall')
  findShopsBySearchTerm(@Body('searchTerm') searchTerm: string) {
    return this.shopService.findAllBySearchTerm(searchTerm);
  }

  @Post('create')
  createShop(@Body() shop: Shop) {
    return this.shopService.createOne(shop);
  }

  @Put()
  updateShop(@Body() shop: Shop) {
    return this.shopService.updateOne(shop);
  }

  @Delete()
  deleteShop(@Body() condition: any) {
    return this.shopService.deleteOneByCondition(condition);
  }

  // ONLY FOR DEVELOPMENT
  @Delete('all')
  deleteAll() {
    return this.shopService.deleteAll() && 'deleted';
  }
}
