import {Body, Controller, Delete, Post, Put} from '@nestjs/common';
import {Favourites} from 'src/entities/favourites.entity';
import {FavouritesService} from '../../services/favourites/favourites.service';

@Controller()
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post('favourites/find')
  findFav(@Body() condition: any) {
    return this.favouritesService.findOneByCondition(condition);
  }

  @Post('favourites/create')
  createFav(@Body() fav: Favourites) {
    return this.favouritesService.createOne(fav);
  }

  @Post('findany')
  findAnyItem(@Body() id: string) {
    return this.favouritesService.findAnyById(id);
  }

  @Put('favourites')
  updateFav(@Body('userId') userId: string, @Body('itemId') itemId: string) {
    console.log('controller', userId, itemId);
    return this.favouritesService.updateOne(userId, itemId);
  }

  @Delete('favourites')
  deleteFav(@Body() condition: any) {
    return this.favouritesService.deleteOneByCondition(condition);
  }
}
