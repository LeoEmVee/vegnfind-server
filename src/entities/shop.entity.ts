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
  @Column({default: 'shopping'})
  business: string;

  @OneToOne(() => MapLocation, mapLocation => mapLocation.shop)
  location: MapLocation;

  @OneToMany(() => Review, review => review.shop)
  reviews: Review[];

  @ManyToMany(() => Product, product => product.shops)
  products: Product[];

  @ManyToMany(() => Category, category => category.shops)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Favourites, favourites => favourites.shopping)
  @JoinTable()
  favourites: Favourites[];

  @ManyToMany(() => Brand, brand => brand.shops) // do we really want this one? maybe just for shops not eat?
  @JoinTable()
  brands: Brand[];
}
