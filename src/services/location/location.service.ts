import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {MapLocation} from 'src/entities/maplocation.entity';
import {Repository} from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(MapLocation)
    private locationRepository: Repository<MapLocation>,
  ) {}

  async findOneByCondition(condition: any): Promise<MapLocation> {
    try {
      return await this.locationRepository.findOneOrFail(condition);
    } catch (error) {
      throw new NotFoundException(error, "This Location doesn't exist");
    }
  }

  async createOne(maplocation: MapLocation): Promise<MapLocation> {
    // check if Location already exists in db
    const locationExists = await this.locationRepository.findOne(null, {
      where: {latitude: maplocation.latitude, longitude: maplocation.longitude},
    });
    if (locationExists) {
      throw new ConflictException('This Location already exists!');
    }

    // create new instance of Location and save into db
    const newLocation = await this.locationRepository.create({...maplocation});
    return this.locationRepository.save(newLocation);
  }

  async updateOne(maplocation: MapLocation): Promise<MapLocation> {
    // TODO add enforcing case:
    // const maplocationLow = {
    //   ...maplocation,
    //   address: maplocation.address.toLowerCase(),
    // };

    // find the stored location in db
    const id = maplocation.id;
    const oldLocation = await this.findOneByCondition({id});

    // create new user with updated properties and save it to db
    const newLocation = {...oldLocation, ...maplocation};
    return this.locationRepository.save(newLocation);
  }

  async deleteOneByCondition(condition: any): Promise<MapLocation> {
    const maplocation = await this.findOneByCondition(condition);
    return await this.locationRepository.remove(maplocation);
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.locationRepository
      .createQueryBuilder()
      .delete()
      .from(MapLocation)
      .execute();
  }
}
