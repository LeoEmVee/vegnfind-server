import {
  ConflictException,
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Shop} from 'src/entities/shop.entity';
import {Repository} from 'typeorm';
import {toTitleCase} from 'src/utils/helpers';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async findOneByCondition(condition: any): Promise<Shop> {
    try {
      return await this.shopRepository
        .createQueryBuilder('shop')
        .leftJoinAndSelect('shop.favourites', 'favourites')
        .leftJoinAndSelect('shop.categories', 'category')
        .leftJoinAndSelect('shop.products', 'product')
        .leftJoinAndSelect('shop.brand', 'brand')
        .leftJoinAndSelect('shop.reviews', 'review')
        .leftJoinAndSelect('shop.location', 'maplocation')
        .where(condition)
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(error, "This Shop doesn't exist");
    }
  }

  async findAllBySearchTerm(searchTerm: string): Promise<Shop[]> {
    try {
      return await this.shopRepository
        .createQueryBuilder('shop')
        .leftJoinAndSelect('shop.favourites', 'favourites')
        .leftJoinAndSelect('shop.categories', 'category')
        .leftJoinAndSelect('shop.products', 'product')
        .leftJoinAndSelect('shop.brand', 'brand')
        .leftJoinAndSelect('shop.reviews', 'review')
        .leftJoinAndSelect('shop.location', 'maplocation')
        .where('LOWER(shop.name) like LOWER(:name)', {
          name: `%${searchTerm}%`,
        })
        .orderBy('shop.name', 'ASC')
        .getMany();
    } catch (error) {
      throw new BadRequestException(error, 'Incorrect find condition.');
    }
  }

  async createOne(shop: Shop): Promise<Shop> {
    const shopCheck = {
      ...shop,
      name: toTitleCase(shop.name),
      email: shop.email.toLowerCase(),
    };
    const shopExists = await this.shopRepository.findOne(null, {
      where: {name: shopCheck.name},
    });
    if (shopExists) {
      throw new ConflictException(shopExists, 'This Shop already exists!');
    }
    const newShop = await this.shopRepository.create({...shopCheck});
    return this.shopRepository.save(newShop);
  }

  async updateOne(shop: Shop): Promise<Shop> {
    const shopLow = {
      ...shop,
      name: toTitleCase(shop.name),
      email: shop.email.toLowerCase(),
    };
    const id = shop.id;
    const oldShop = await this.findOneByCondition({id});
    const newShop = {...oldShop, ...shopLow};
    return this.shopRepository.save(newShop);
  }

  async deleteOneByCondition(condition: any): Promise<Shop> {
    try {
      const shop = await this.findOneByCondition(condition);
      return await this.shopRepository.remove(shop);
    } catch (error) {
      throw new NotFoundException(error, "Couldn't delete, entry not found.");
    }
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.shopRepository
      .createQueryBuilder()
      .delete()
      .from(Shop)
      .execute();
  }
}
