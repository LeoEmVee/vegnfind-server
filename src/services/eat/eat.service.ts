import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Eat} from 'src/entities/eat.entity';
import {Like, Repository} from 'typeorm';

@Injectable()
export class EatService {
  constructor(
    @InjectRepository(Eat)
    private eatRepository: Repository<Eat>,
  ) {}

  async findOneByCondition(condition: any): Promise<Eat> {
    try {
      return await this.eatRepository.findOneOrFail(condition);
    } catch (error) {
      throw new NotFoundException(error, "This Eat doesn't exist");
    }
  }

  async findAllBySearchTerm(searchTerm: string): Promise<Eat[]> {
    try {
      return await this.eatRepository.find({name: Like(`%${searchTerm}%`)});
    } catch (error) {
      throw new NotFoundException('No Restaurants match the query');
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
    const id = eat.id;
    const oldEat = await this.findOneByCondition({id});
    const newEat = {...oldEat, ...eat};
    return this.eatRepository.save(newEat);
  }

  async deleteOneByCondition(condition: any): Promise<Eat> {
    const eat = await this.findOneByCondition(condition);
    return await this.eatRepository.remove(eat);
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.eatRepository.createQueryBuilder().delete().from(Eat).execute();
  }
}
