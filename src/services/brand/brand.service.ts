import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Brand} from 'src/entities/brand.entity';
import {Repository} from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async getAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async createOne(brand: Brand): Promise<Brand> {
    const brandExists = await this.brandRepository.findOne(null, {
      where: {name: brand.name},
    });
    if (brandExists) {
      throw new ConflictException(null, 'This brand already exists!');
    }
    const newBrand = await this.brandRepository.create({...brand});
    return this.brandRepository.save(newBrand);
  }

  async deleteOne(id: string): Promise<Brand> {
    try {
      const brand = await this.brandRepository.findOneOrFail(id);
      return await this.brandRepository.remove(brand);
    } catch (error) {
      throw new ConflictException(null, "This brand doesn't exist!");
    }
  }

  async deleteAll(): Promise<void> {
    await this.brandRepository
      .createQueryBuilder()
      .delete()
      .from(Brand)
      .execute();
  }
}
