import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Veggie} from 'src/entities/veggie.entity';
import {Repository} from 'typeorm';

@Injectable()
export class VeggieService {
  constructor(
    @InjectRepository(Veggie)
    private veggieRepository: Repository<Veggie>,
  ) {}

  async create(veggie): Promise<Veggie> {
    return await this.veggieRepository.save(veggie);
  }

  async deleteAll(): Promise<void> {
    await this.veggieRepository
      .createQueryBuilder()
      .delete()
      .from(Veggie)
      .execute();
  }
}
