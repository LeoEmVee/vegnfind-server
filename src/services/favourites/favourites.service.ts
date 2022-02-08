import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Favourites} from '../../entities/favourites.entity';
import {Repository} from 'typeorm';
import {Eat} from 'src/entities/eat.entity';
import {Product} from 'src/entities/product.entity';
import {Shop} from 'src/entities/shop.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourites)
    private favouritesRepository: Repository<Favourites>,
    @InjectRepository(Eat)
    private eatRepository: Repository<Eat>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findOneByCondition(condition: any): Promise<Favourites> {
    try {
      return await this.favouritesRepository
        .createQueryBuilder('favourites')
        .leftJoinAndSelect('favourites.products', 'product')
        .leftJoinAndSelect('favourites.shopping', 'shop')
        .leftJoinAndSelect('favourites.eating', 'eat')
        .leftJoinAndSelect('favourites.user', 'veggie')
        .where(condition)
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(error, "This Fav doesn't exist");
    }
  }

  async findAnyById(id: string): Promise<any> {
    try {
      const eat = await this.eatRepository
        .createQueryBuilder('eat')
        .leftJoinAndSelect('eat.favourites', 'favourites')
        .leftJoinAndSelect('eat.categories', 'category')
        .leftJoinAndSelect('eat.brands', 'brand')
        .leftJoinAndSelect('eat.reviews', 'review')
        .leftJoinAndSelect('eat.location', 'maplocation')
        .where({id: id})
        .getOne();
      const shop = await this.shopRepository
        .createQueryBuilder()
        .leftJoinAndSelect('shop.favourites', 'favourites')
        .leftJoinAndSelect('shop.categories', 'category')
        .leftJoinAndSelect('shop.products', 'product')
        .leftJoinAndSelect('shop.brand', 'brand')
        .leftJoinAndSelect('shop.reviews', 'review')
        .leftJoinAndSelect('shop.location', 'maplocation')
        .where({id: id})
        .getOne();
      const product = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.favourites', 'favourites')
        .leftJoinAndSelect('product.categories', 'category')
        .leftJoinAndSelect('product.shops', 'shop')
        .leftJoinAndSelect('product.reviews', 'review')
        .leftJoinAndSelect('product.brand', 'brand')
        .where({id: id})
        .getOne();
      return eat || shop || product;
    } catch (error) {
      throw new NotFoundException(error, 'Item not found!');
    }
  }

  async createOne(fav: Favourites): Promise<Favourites> {
    const favExists = await this.favouritesRepository.findOne(null, {
      where: {user: fav.user},
    });
    if (favExists) {
      throw new ConflictException('This user already has a Fav list!');
    }
    const newFav = await this.favouritesRepository.create({...fav});
    return this.favouritesRepository.save(newFav);
  }

  async updateOne(userId, itemId): Promise<Favourites> {
    console.log('service', userId, itemId);
    try {
      const oldFav = await this.findOneByCondition({user: userId});
      const newFav = {...oldFav};
      // if shopping || eating || products include the item, remove it:
      const shopIndex = newFav.shopping.findIndex(
        (item: any) => item.id === itemId,
      );
      const eatIndex = newFav.eating.findIndex(
        (item: any) => item.id === itemId,
      );
      const productIndex = newFav.products.findIndex(
        (item: any) => item.id === itemId,
      );

      if (shopIndex !== -1 || eatIndex !== -1 || productIndex !== -1) {
        shopIndex !== -1 && newFav.shopping.splice(shopIndex, 1);
        eatIndex !== -1 && newFav.eating.splice(eatIndex, 1);
        productIndex !== -1 && newFav.products.splice(productIndex, 1);
      } else {
        // else, look for the item in tables and include it in the correct array
        const isEat = await this.eatRepository.findOne(itemId);
        const isShop = await this.shopRepository.findOne(itemId);
        const isProduct = await this.productRepository.findOne(itemId);

        if (isEat || isShop || isProduct) {
          isEat && newFav.eating.push(isEat);
          isShop && newFav.shopping.push(isShop);
          isProduct && newFav.products.push(isProduct);
        }
      }
      return await this.favouritesRepository.save(newFav);
    } catch (error) {
      throw new NotFoundException(error, 'Fav list or fav item not found!');
    }
  }

  async deleteOneByCondition(condition: any): Promise<Favourites> {
    try {
      const fav = await this.findOneByCondition(condition);
      return await this.favouritesRepository.remove(fav);
    } catch (error) {
      throw new NotFoundException(error, "Couldn't delete, entry not found.");
    }
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.favouritesRepository
      .createQueryBuilder()
      .delete()
      .from(Favourites)
      .execute();
  }
}
