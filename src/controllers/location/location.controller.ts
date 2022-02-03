import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {MapLocation} from 'src/entities/maplocation.entity';
import {LocationService} from '../../services/location/location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('find')
  async findLocation(@Body() condition: string) {
    const maplocation = await this.locationService.findOneByCondition(
      condition,
    );
    return maplocation;
  }

  // POST IS ALWAYS HANDLED THROUGH AUTH.CONTROLLER
  @Post('create')
  createLocation(@Body() maplocation: MapLocation) {
    return this.locationService.createOne(maplocation);
  }

  @Put()
  updateLocation(@Body() maplocation: MapLocation) {
    return this.locationService.updateOne(maplocation);
  }

  @Delete()
  deleteLocation(@Body() condition: string) {
    return this.locationService.deleteOneByCondition(condition);
  }

  // ONLY FOR DEVELOPMENT
  @Delete('all')
  deleteAll() {
    return this.locationService.deleteAll() && 'deleted';
  }
}
