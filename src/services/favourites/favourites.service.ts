import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Favourites} from '../../entities/favourites.entity';
import {Repository} from 'typeorm';
import {Eat} from 'src/entities/eat.entity';
import {Product} from 'src/entities/product.entity';
import {Shop} from 'src/entities/shop.entity';
import {create} from 'domain';

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
      const eat = await this.eatRepository.findOne(id, {
        relations: ['categories', 'location', 'reviews', 'favourites', 'brand'],
      });

      const shop = await this.shopRepository.findOne(id, {
        relations: [
          'categories',
          'location',
          'reviews',
          'products',
          'favourites',
          'brand',
        ],
      });

      const product = await this.productRepository.findOne(id, {
        relations: ['favourites', 'reviews', 'brand', 'shops', 'categories'],
      });

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
    try {
      const oldFav = await this.favouritesRepository.findOne({user: userId});
      if (!oldFav) {
        // check if item is shop, eat or product:
        const product = await this.productRepository.findOne(itemId);
        const shop = await this.shopRepository.findOne(itemId);
        const eat = await this.eatRepository.findOne(itemId);

        console.log(product, shop, eat);
        const createdFav = await this.favouritesRepository.create({
          user: userId,
        });
        if (product) {
          createdFav.products = [product];
        }
        if (shop) {
          createdFav.shopping = [shop];
        }
        if (eat) {
          createdFav.eating = [eat];
        }
        const createdFav2 = await this.favouritesRepository.create({
          ...createdFav,
        });
        return this.favouritesRepository.save({...createdFav2});
      } else {
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

        if (shopIndex !== -1 && eatIndex !== -1 && productIndex !== -1) {
          if (shopIndex !== -1) {
            newFav.shopping.splice(shopIndex, 1);
          }
          if (eatIndex !== -1) {
            newFav.eating.splice(eatIndex, 1);
          }
          if (productIndex !== -1) {
            newFav.products.splice(productIndex, 1);
          }
          return await this.favouritesRepository.save(newFav);
        } else {
          // else, look for the item in tables and include it in the correct array
          const isEat = await this.eatRepository.findOne(itemId);
          const isShop = await this.shopRepository.findOne(itemId);
          const isProduct = await this.productRepository.findOne(itemId);

          isEat && newFav.eating.push(isEat);
          isShop && newFav.shopping.push(isShop);
          isProduct && newFav.products.push(isProduct);
          console.log('HERE', newFav);
          return await this.favouritesRepository.save(newFav);
        }
      }
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
