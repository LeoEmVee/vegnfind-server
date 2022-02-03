import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {Brand} from './brand.entity';
import {MapLocation} from './maplocation.entity';
import {Business} from './abstract/business';
import {Category} from './category.entity';
import {Product} from './product.entity';
import {Review} from './review.entity';
import {Favourites} from './favourites.entity';

@Entity()
export class Shop extends Business {
  @OneToOne(() => MapLocation, mapLocation => mapLocation.shop, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  location: MapLocation;

  @OneToMany(() => Review, review => review.shop, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  reviews: Review[];

  @ManyToMany(() => Product, product => product.shops, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  products: Product[];

  @ManyToMany(() => Category, category => category.shops, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Favourites, favourites => favourites.shopping, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  favourites: Favourites[];

  @ManyToMany(() => Brand, brand => brand.shops, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  brands: Brand[];
}
