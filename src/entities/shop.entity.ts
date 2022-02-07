import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import {Brand} from './brand.entity';
import {Maplocation} from './maplocation.entity';
import {Business} from './abstract/business';
import {Category} from './category.entity';
import {Product} from './product.entity';
import {Review} from './review.entity';
import {Favourites} from './favourites.entity';

@Entity()
export class Shop extends Business {
  @OneToOne(() => Maplocation, maplocation => maplocation.shop, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn({name: 'location'})
  location: Maplocation;

  @OneToMany(() => Review, review => review.shop, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn({name: 'reviews'})
  reviews?: Review[];

  @ManyToMany(() => Product, product => product.shops, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  products?: Product[];

  @ManyToMany(() => Category, category => category.shops, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  categories?: Category[];

  @ManyToMany(() => Favourites, favourites => favourites.shopping, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  favourites?: Favourites[];

  @ManyToMany(() => Brand, brand => brand.shops, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  brands?: Brand[];
}
