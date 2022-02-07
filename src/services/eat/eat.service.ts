import {
  ConflictException,
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Eat} from 'src/entities/eat.entity';
import {Repository} from 'typeorm';

@Injectable()
export class EatService {
  constructor(
    @InjectRepository(Eat)
    private eatRepository: Repository<Eat>,
  ) {}

  async findOneByCondition(condition: any): Promise<Eat> {
    try {
      return await this.eatRepository
        .createQueryBuilder('eat')
        .leftJoinAndSelect('eat.favourites', 'favourites')
        .leftJoinAndSelect('eat.categories', 'category')
        .leftJoinAndSelect('eat.brands', 'brand')
        .leftJoinAndSelect('eat.reviews', 'review')
        .leftJoinAndSelect('eat.location', 'maplocation')
        .where(condition)
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(error, "This Eat doesn't exist");
    }
  }

  async findAllBySearchTerm(searchTerm: string): Promise<Eat[]> {
    try {
      return await this.eatRepository
        .createQueryBuilder('eat')
        .leftJoinAndSelect('eat.favourites', 'favourites')
        .leftJoinAndSelect('eat.categories', 'category')
        .leftJoinAndSelect('eat.brands', 'brand')
        .leftJoinAndSelect('eat.reviews', 'review')
        .leftJoinAndSelect('eat.location', 'maplocation')
        .where('LOWER(eat.name) like LOWER(:name)', {name: `%${searchTerm}%`})
        .orderBy('eat.name', 'ASC')
        .getMany();
    } catch (error) {
      throw new BadRequestException(error, 'Incorrect find condition.');
    }
  }

  async createOne(eat: Eat): Promise<Eat> {
    const eatExists = await this.eatRepository.findOne(null, {
      where: {name: eat.name},
    });
    if (eatExists) {
      throw new ConflictException(eatExists, 'This Eat already exists!');
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
    try {
      const eat = await this.findOneByCondition(condition);
      return await this.eatRepository.remove(eat);
    } catch (error) {
      throw new NotFoundException(error, "Couldn't delete, entry not found.");
    }
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.eatRepository.createQueryBuilder().delete().from(Eat).execute();
  }
}
