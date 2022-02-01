import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {Shop} from 'src/entities/shop.entity';
import {ShopService} from 'src/services/shop/shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findShop(@Body() id: string) {
    return this.shopService.findOneById(id);
  }

  @Post()
  createShop(@Body() shop: Shop) {
    return this.shopService.createOne(shop);
  }

  @Put()
  updateShop(@Body() shop: Shop) {
    return this.shopService.updateOne(shop);
  }

  @Delete()
  deleteShop(@Body() id: string) {
    return this.shopService.deleteOne(id);
  }

  // ONLY FOR DEVELOPMENT
  @Delete('all')
  deleteAll() {
    return this.shopService.deleteAll() && 'deleted';
  }
}
