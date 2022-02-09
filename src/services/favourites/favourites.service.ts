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

  async findAnyById(id: string): Promise<Eat | Shop | Product> {
    try {
      const eat = await this.eatRepository.findOne(id, {
        relations: [
          'categories',
          'location',
          'reviews',
          'reviews.user',
          'favourites',
          'brand',
        ],
      });

      const shop = await this.shopRepository.findOne(id, {
        relations: [
          'categories',
          'location',
          'reviews',
          'reviews.user',
          'products',
          'favourites',
          'brand',
        ],
      });

      const product = await this.productRepository.findOne(id, {
        relations: [
          'favourites',
          'reviews',
          'reviews.user',
          'brand',
          'shops',
          'categories',
        ],
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
      const oldFav = await this.favouritesRepository.findOne(
        {user: userId},
        {relations: ['products', 'shopping', 'eating']},
      );
      console.log('OLD', oldFav);
      if (!oldFav) {
        // check if item is shop, eat or product:
        const product = await this.productRepository.findOne(itemId);
        const shop = await this.shopRepository.findOne(itemId);
        const eat = await this.eatRepository.findOne(itemId);

        console.log('FIRST', product, shop, eat);
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
        return this.favouritesRepository.save({...createdFav});
      } else {
        const newFav = {...oldFav};
        console.log('second', newFav);
        // if shopping || eating || products include the item, remove it:
        if (newFav.shopping || newFav.eating || newFav.products) {
          const shopIndex = newFav.shopping.findIndex(
            (item: any) => item.id === itemId,
          );
          const eatIndex = newFav.eating.findIndex(
            (item: any) => item.id === itemId,
          );
          const productIndex = newFav.products.findIndex(
            (item: any) => item.id === itemId,
          );

          console.log('indexes', shopIndex, eatIndex, productIndex);
          if (shopIndex !== -1) {
            newFav.shopping.splice(shopIndex, 1);
            return await this.favouritesRepository.save(newFav);
          }
          if (eatIndex !== -1) {
            newFav.eating.splice(eatIndex, 1);
            return await this.favouritesRepository.save(newFav);
          }
          if (productIndex !== -1) {
            newFav.products.splice(productIndex, 1);
            return await this.favouritesRepository.save(newFav);
          }
        }

        // else, look for the item in tables and include it in the correct array
        const isEat = await this.eatRepository.findOne(itemId);
        const isShop = await this.shopRepository.findOne(itemId);
        const isProduct = await this.productRepository.findOne(itemId);
        console.log('found items', isEat, isShop, isProduct);
        if (isEat) {
          newFav.eating ? newFav.eating.push(isEat) : (newFav.eating = [isEat]);
        }
        if (isShop) {
          newFav.shopping
            ? newFav.shopping.push(isShop)
            : (newFav.shopping = [isShop]);
        }
        if (isProduct) {
          newFav.products
            ? newFav.products.push(isProduct)
            : (newFav.products = [isProduct]);
        }
        console.log('HERE', newFav);
        return await this.favouritesRepository.save(newFav);
      }
    } catch (error) {
      throw new NotFoundException(error, 'Fav list or fav item not found!');
    }
  }

  isInstanceOfEat(data: any): data is Eat {
    return 'name' in data;
  }
  isInstanceOfShop(data: any): data is Shop {
    return 'name' in data;
  }
  isInstanceOfProduct(data: any): data is Product {
    return 'name' in data;
  }

  async updateItemImages(id: string, url: string) {
    const item = await this.findAnyById(id);
    let newImages = [];
    if (item.images.includes(url)) {
      const remImages = [...item.images];
      remImages.splice(item.images.indexOf(url), 1);
      newImages = [...remImages];
    } else {
      newImages = item.images ? [...item.images, url] : [url];
    }
    if (this.isInstanceOfEat(item)) {
      const newItem = {...item, images: newImages};
      const newEat = await this.eatRepository.create(newItem);
      return await this.eatRepository.save(newEat);
    }
    if (this.isInstanceOfShop(item)) {
      const newItem = {...item, images: newImages};
      const newShop = await this.shopRepository.create(newItem);
      return await this.shopRepository.save(newShop);
    }
    if (this.isInstanceOfProduct(item)) {
      const newItem = {...item, images: newImages};
      const newProduct = await this.productRepository.create(newItem);
      return this.productRepository.save(newProduct);
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
