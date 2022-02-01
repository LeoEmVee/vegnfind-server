import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {Eat} from 'src/entities/eat.entity';
import {EatService} from 'src/services/eat/eat.service';

@Controller('eat')
export class EatController {
  constructor(private readonly eatService: EatService) {}

  @Get()
  findEat(@Body() id: string) {
    return this.eatService.findOneById(id);
  }

  @Post()
  createEat(@Body() eat: Eat) {
    const eatLow = {
      ...eat,
      name: eat.name.toUpperCase(),
      email: eat.email.toLowerCase(),
    };
    return this.eatService.createOne(eatLow);
  }

  @Put()
  updateEat(@Body() eat: Eat) {
    const eatLow = {
      ...eat,
      name: eat.name.toUpperCase(),
      email: eat.email.toLowerCase(),
    };
    return this.eatService.updateOne(eatLow);
  }

  @Delete()
  deleteEat(@Body() id: string) {
    return this.eatService.deleteOne(id);
  }

  // ONLY FOR DEVELOPMENT
  @Delete('all')
  deleteAll() {
    return this.eatService.deleteAll() && 'deleted';
  }
}
