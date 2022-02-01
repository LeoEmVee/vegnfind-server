import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Shop} from 'src/entities/shop.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async findOneById(id: string): Promise<Shop> {
    try {
      return await this.shopRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error, "This Shop doesn't exist");
    }
  }

  async createOne(shop: Shop): Promise<Shop> {
    const shopLow = {
      ...shop,
      name: shop.name.toUpperCase(),
      email: shop.email.toLowerCase(),
    };
    const shopExists = await this.shopRepository.findOne(null, {
      where: {name: shopLow.name},
    });
    if (shopExists) {
      throw new ConflictException(null, 'This Shop already exists!');
    }
    const newShop = await this.shopRepository.create({...shopLow});
    return this.shopRepository.save(newShop);
  }

  async updateOne(shop: Shop): Promise<Shop> {
    const shopLow = {
      ...shop,
      name: shop.name.toUpperCase(),
      email: shop.email.toLowerCase(),
    };
    const oldShop = await this.findOneById(shopLow.id);
    const newShop = {...oldShop, ...shopLow};
    return this.shopRepository.save(newShop);
  }

  async deleteOne(id: string): Promise<Shop> {
    const shop = await this.findOneById(id);
    return await this.shopRepository.remove(shop);
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
