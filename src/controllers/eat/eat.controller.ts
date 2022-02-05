import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';
import {Eat} from 'src/entities/eat.entity';
import {EatService} from 'src/services/eat/eat.service';

@Controller('eat')
export class EatController {
  constructor(private readonly eatService: EatService) {}

  @Post('find')
  findEat(@Body() condition: any) {
    return this.eatService.findOneByCondition(condition);
  }

  @Post('findall')
  findAllEats(@Body('searchTerm') searchTerm: string) {
    return this.eatService.findAllBySearchTerm(searchTerm);
  }

  @Post('create')
  createEat(@Body() eat: Eat) {
    try {
      const eatLow = {
        ...eat,
        name: eat.name.toUpperCase(),
        email: eat.email.toLowerCase(),
      };
      return this.eatService.createOne(eatLow);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
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
  deleteEat(@Body() condition: any) {
    return this.eatService.deleteOneByCondition(condition);
  }

  // ONLY FOR DEVELOPMENT
  @Delete('all')
  deleteAll() {
    return this.eatService.deleteAll() && 'deleted';
  }
}
