import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import {Review} from './review.entity';
import {Favourites} from './favourites.entity';
import {Category} from './category.entity';
import {Shop} from './shop.entity';
import {Brand} from './brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  thumbImg: string;

  @Column('text', {array: true})
  images: string[];

  @Column('int')
  rating: number;

  @Column('int')
  userFavCount: number;

  @ManyToMany(() => Favourites, favourites => favourites.user)
  @JoinTable()
  favourites: Favourites;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @ManyToOne(() => Brand, brand => brand.products)
  brand: Brand;

  @ManyToMany(() => Shop, shop => shop.products)
  shops: Shop[];

  @ManyToMany(() => Category, category => category.products)
  @JoinTable()
  categories: Category[];
}
