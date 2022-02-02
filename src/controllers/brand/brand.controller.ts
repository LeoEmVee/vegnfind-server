import {Body, Controller, Get, Post, Delete} from '@nestjs/common';
import {Brand} from 'src/entities/brand.entity';
import {BrandService} from 'src/services/brand/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @Get('all')
  getAllBrands() {
    return this.brandService.getAll();
  }

  @Post()
  createBrand(@Body() brand: Brand) {
    const brandLow = {
      ...brand,
      name: brand.name.toLowerCase(),
    };
    return this.brandService.createOne(brandLow);
  }

  // ONLY FOR DEVELOPMENT
  @Delete()
  deleteBrandById(@Body() id: string) {
    return this.brandService.deleteOne(id);
  }

  @Delete('all')
  deleteAllBrands() {
    return this.brandService.deleteAll();
  }
}
