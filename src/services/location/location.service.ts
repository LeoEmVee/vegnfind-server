import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Maplocation} from 'src/entities/maplocation.entity';
import {Repository} from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Maplocation)
    private locationRepository: Repository<Maplocation>,
  ) {}

  async findOneByCondition(condition: any): Promise<Maplocation> {
    try {
      return await this.locationRepository.findOneOrFail(condition);
    } catch (error) {
      throw new NotFoundException(error, "This location doesn't exist");
    }
  }

  async createOne(maplocation: Maplocation): Promise<Maplocation> {
    // check if location already exists in db
    const locationExists = await this.locationRepository.findOne(null, {
      where: {latitude: maplocation.latitude, longitude: maplocation.longitude},
    });
    if (locationExists) {
      throw new ConflictException('This location already exists!');
    }

    // create new instance of location and save into db
    const newlocation = await this.locationRepository.create({...maplocation});
    return this.locationRepository.save(newlocation);
  }

  async updateOne(maplocation: Maplocation): Promise<Maplocation> {
    // TODO add enforcing case:
    // const maplocationLow = {
    //   ...maplocation,
    //   address: maplocation.address.toLowerCase(),
    // };

    // find the stored location in db
    const id = maplocation.id;
    const oldlocation = await this.findOneByCondition({id});

    // create new user with updated properties and save it to db
    const newlocation = {...oldlocation, ...maplocation};
    return this.locationRepository.save(newlocation);
  }

  async deleteOneByCondition(condition: any): Promise<Maplocation> {
    const maplocation = await this.findOneByCondition(condition);
    return await this.locationRepository.remove(maplocation);
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.locationRepository
      .createQueryBuilder()
      .delete()
      .from(Maplocation)
      .execute();
  }
}
