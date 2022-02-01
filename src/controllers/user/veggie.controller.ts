import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {Veggie} from 'src/entities/veggie.entity';
import {VeggieService} from 'src/services/user/veggie.service';

@Controller('veggie')
export class VeggieController {
  constructor(private readonly veggieService: VeggieService) {}

  @Get()
  findUser(@Body() condition: string) {
    return this.veggieService.findOneByCondition(condition);
  }

  // POST IS ALWAYS HANDLED THROUGH AUTH.CONTROLLER
  @Post()
  createVeggie(@Body() veggie: Veggie) {
    return this.veggieService.createOne(veggie);
  }

  @Put()
  updateVeggie(@Body() veggie: Veggie) {
    return this.veggieService.updateOne(veggie);
  }

  @Delete()
  deleteVeggie(@Body() id: string) {
    return this.veggieService.deleteOneByCondition(id);
  }

  // ONLY FOR DEVELOPMENT
  @Delete('all')
  deleteAll() {
    return this.veggieService.deleteAll() && 'deleted';
  }
}
