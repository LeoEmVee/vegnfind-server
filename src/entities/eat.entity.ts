import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import {Business} from './abstract/business';
import {Category} from './category.entity';
import {Favourites} from './favourites.entity';
import {MapLocation} from './maplocation.entity';
import {Review} from './review.entity';

@Entity()
export class Eat extends Business {
  @Column({default: 'eating'})
  business: string;

  @OneToOne(() => MapLocation, mapLocation => mapLocation.eat)
  location: MapLocation;

  @OneToMany(() => Review, review => review.eat)
  reviews: Review[];

  // NO PRODUCTS FOR EAT MAYBE ??
  // @ManyToMany(() => Product, product => product.shops)
  // products: Product[];

  // this allows us to separate on Category.shops / Category.eats
  @ManyToMany(() => Category, category => category.eats)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Favourites, favourites => favourites.eating)
  @JoinTable()
  favourites: Favourites[];

  // do we really want this one? maybe just for shops not eat?
  // @ManyToMany(() => Brand, brand => brand.shops)
  // @JoinTable()
  // brands: Brand[];
}
