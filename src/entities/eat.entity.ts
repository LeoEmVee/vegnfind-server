import {Entity, OneToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';

import {Business} from './abstract/business';
import {Brand} from './brand.entity';
import {Category} from './category.entity';
import {Favourites} from './favourites.entity';
import {MapLocation} from './maplocation.entity';
import {Review} from './review.entity';

@Entity()
export class Eat extends Business {
  @OneToOne(() => MapLocation, mapLocation => mapLocation.eat, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  location: MapLocation;

  @OneToMany(() => Review, review => review.eat, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  reviews: Review[];

  // this allows us to separate on Category.shops / Category.eats
  @ManyToMany(() => Category, category => category.eats, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Favourites, favourites => favourites.eating, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  favourites: Favourites[];

  @ManyToMany(() => Brand, brand => brand.eats, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  brands: Brand[];
}
