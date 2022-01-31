import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Veggie} from 'src/entities/veggie.entity';
import {Repository} from 'typeorm';

@Injectable()
export class VeggieService {
  constructor(
    @InjectRepository(Veggie)
    private veggieRepository: Repository<Veggie>,
  ) {}

  async findOneById(id: string): Promise<Veggie> {
    try {
      return await this.veggieRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error, "This Veggie doesn't exist");
    }
  }

  async createOne(veggie: Veggie): Promise<Veggie> {
    try {
      if (veggie.id && this.findOneById(veggie.id)) {
        throw new Error();
      }
      const newVeggie = await this.veggieRepository.create({...veggie});
      return this.veggieRepository.save(newVeggie);
    } catch (error) {
      throw new ConflictException(error, 'This Veggie already exists!');
    }
  }

  async updateOne(veggie: Veggie): Promise<Veggie> {
    const oldVeggie = await this.findOneById(veggie.id);
    const newVeggie = {...oldVeggie, ...veggie};
    return this.veggieRepository.save(newVeggie);
  }

  async deleteOne(id: string): Promise<Veggie> {
    const veggie = await this.findOneById(id);
    return await this.veggieRepository.remove(veggie);
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.veggieRepository
      .createQueryBuilder()
      .delete()
      .from(Veggie)
      .execute();
  }
}
