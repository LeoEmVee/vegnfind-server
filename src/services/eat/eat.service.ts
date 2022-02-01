import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Eat} from 'src/entities/eat.entity';
import {Repository} from 'typeorm';

@Injectable()
export class EatService {
  constructor(
    @InjectRepository(Eat)
    private eatRepository: Repository<Eat>,
  ) {}

  async findOneById(id: string): Promise<Eat> {
    try {
      return await this.eatRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error, "This Eat doesn't exist");
    }
  }

  async createOne(eat: Eat): Promise<Eat> {
    const eatExists = await this.eatRepository.findOne(null, {
      where: {name: eat.name},
    });
    if (eatExists) {
      throw new ConflictException(null, 'This Eat already exists!');
    }
    const newEat = await this.eatRepository.create({...eat});
    return this.eatRepository.save(newEat);
  }

  async updateOne(eat: Eat): Promise<Eat> {
    const oldEat = await this.findOneById(eat.id);
    const newEat = {...oldEat, ...eat};
    return this.eatRepository.save(newEat);
  }

  async deleteOne(id: string): Promise<Eat> {
    const eat = await this.findOneById(id);
    return await this.eatRepository.remove(eat);
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.eatRepository.createQueryBuilder().delete().from(Eat).execute();
  }
}
