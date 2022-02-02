import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {Veggie} from 'src/entities/veggie.entity';
import {VeggieService} from 'src/services/user/veggie.service';

@Controller('veggie')
export class VeggieController {
  constructor(private readonly veggieService: VeggieService) {}

  @Post('find')
  async findUser(@Body() condition: string) {
    const user = await this.veggieService.findOneByCondition(condition);
    const {password, ...result} = user;
    return result;
  }

  // POST IS ALWAYS HANDLED THROUGH AUTH.CONTROLLER
  @Post('create')
  createVeggie(@Body() veggie: Veggie) {
    return this.veggieService.createOne(veggie);
  }

  @Put()
  updateVeggie(@Body() veggie: Veggie) {
    return this.veggieService.updateOne(veggie);
  }

  @Delete()
  deleteVeggie(@Body() condition: string) {
    return this.veggieService.deleteOneByCondition(condition);
  }

  // ONLY FOR DEVELOPMENT
  @Delete('all')
  deleteAll() {
    return this.veggieService.deleteAll() && 'deleted';
  }
}
