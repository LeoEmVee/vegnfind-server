import {Body, Controller, Delete, Post, Put} from '@nestjs/common';
import {Favourites} from 'src/entities/favourites.entity';
import {Repository} from 'typeorm';
import {FavouritesService} from '../../services/favourites/favourites.service';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post('find')
  findFav(@Body() condition: any) {
    return this.favouritesService.findOneByCondition(condition);
  }

  @Post('create')
  createFav(@Body() fav: Favourites) {
    return this.favouritesService.createOne(fav);
  }

  @Put()
  updateFav(@Body('userId') userId: string, @Body('itemId') itemId: string) {
    console.log('controller', userId, itemId);
    return this.favouritesService.updateOne(userId, itemId);
  }

  @Delete()
  deleteFav(@Body() condition: any) {
    return this.favouritesService.deleteOneByCondition(condition);
  }
}
