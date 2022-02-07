import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';
import {Favourites} from 'src/entities/favourites.entity';
import {FavouritesService} from '../../services/favourites/favourites.service';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post('create')
  createFav(@Body() fav: Favourites) {
    return this.favouritesService.createOne(fav);
  }

  @Put()
  updateFav(@Body() newFav: Favourites) {
    return this.favouritesService.updateOne(newFav);
  }

  @Delete()
  deleteFav(@Body() condition: any) {
    return this.favouritesService.deleteOneByCondition(condition);
  }
}
