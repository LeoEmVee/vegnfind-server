import {Body, Controller, Delete, Post} from '@nestjs/common';
import {Veggie} from 'src/entities/veggie.entity';
import {VeggieService} from 'src/services/user/veggie.service';

@Controller('user')
export class VeggieController {
  constructor(private readonly veggieService: VeggieService) {}

  @Post()
  createNewUser(@Body() data: Veggie) {
    const veggie = {...new Veggie(), ...data};
    // const veggie = data;
    console.log(veggie);
    return this.veggieService.create(veggie);
  }

  @Delete()
  deleteAll() {
    return this.veggieService.deleteAll() && 'deleted';
  }
}
