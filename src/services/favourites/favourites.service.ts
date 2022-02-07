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
      console.log('newFav before', newFav);
      // if shopping || eating || products include the item, remove it:
      if (newFav.shopping.includes(itemId)) {
        newFav.shopping.splice(newFav.shopping.indexOf(itemId), 1);
      } else if (newFav.eating.includes(itemId)) {
        newFav.eating.splice(newFav.eating.indexOf(itemId), 1);
      } else if (newFav.products.includes(itemId)) {
        newFav.products.splice(newFav.products.indexOf(itemId), 1);
      } else {
        // else, look for the item in tables and include it in the correct array
        console.log('newFav else', newFav);
        const isEat = await this.eatRepository.findOne(itemId);
        const isShop = await this.shopRepository.findOne(itemId);
        const isProduct = await this.productRepository.findOne(itemId);
        if (isEat) {
          newFav.eating.push(itemId);
        } else if (isShop) {
          newFav.shopping.push(itemId);
        } else if (isProduct) {
          newFav.products.push(itemId);
        }
      }
      console.log('newFav after', newFav);
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
