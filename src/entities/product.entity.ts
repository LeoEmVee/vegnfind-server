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
import {truncateSync} from 'fs';

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

  @Column('text', {array: true, nullable: true})
  images?: string[];

  @Column('int', {nullable: true})
  rating?: number;

  @Column('int', {nullable: true})
  userFavCount?: number;

  @ManyToMany(() => Favourites, favourites => favourites.user, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  favourites: Favourites;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @ManyToOne(() => Brand, brand => brand.products)
  brand: Brand;

  @ManyToMany(() => Shop, shop => shop.products, {onDelete: 'CASCADE'})
  shops: Shop[];

  @ManyToOne(() => Category, category => category.products, {
    onDelete: 'CASCADE',
  })
  categories: Category;
}
