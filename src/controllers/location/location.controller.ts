import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {Maplocation} from 'src/entities/maplocation.entity';
import {LocationService} from '../../services/location/location.service';

@Controller('location')
export class locationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('find')
  async findlocation(@Body() condition: string) {
    const maplocation = await this.locationService.findOneByCondition(
      condition,
    );
    return maplocation;
  }

  // POST IS ALWAYS HANDLED THROUGH AUTH.CONTROLLER
  @Post('create')
  createlocation(@Body() maplocation: Maplocation) {
    return this.locationService.createOne(maplocation);
  }

  @Put()
  updatelocation(@Body() maplocation: Maplocation) {
    return this.locationService.updateOne(maplocation);
  }

  @Delete()
  deletelocation(@Body() condition: string) {
    return this.locationService.deleteOneByCondition(condition);
  }

  // ONLY FOR DEVELOPMENT
  @Delete('all')
  deleteAll() {
    return this.locationService.deleteAll() && 'deleted';
  }
}
