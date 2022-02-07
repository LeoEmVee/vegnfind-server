import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
<<<<<<< HEAD
  CreateDateColumn,
  UpdateDateColumn,
=======
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
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
<<<<<<< HEAD
    cascade: ['insert', 'update', 'remove'],
=======
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
  })
  @JoinColumn({name: 'location'})
  location: Maplocation;

  @OneToMany(() => Review, review => review.shop, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({name: 'reviews'})
  reviews?: Review[];

  @ManyToMany(() => Product, product => product.shops, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'shop_to_product'})
  products?: Product[];

  @ManyToMany(() => Category, category => category.shops, {
    cascade: ['insert', 'update'],
  })
  categories?: Category[];

  @ManyToMany(() => Favourites, favourites => favourites.shopping, {
    cascade: ['insert', 'update'],
  })
  favourites?: Favourites[];

  @ManyToMany(() => Brand, brand => brand.shops, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'shop_to_brand'})
  brands?: Brand[];
<<<<<<< HEAD

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
=======
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
}
