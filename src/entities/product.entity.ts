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
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  favourites: Favourites;

  @OneToMany(() => Review, review => review.product, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  reviews: Review[];

  @ManyToOne(() => Brand, brand => brand.products, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  brand: Brand;

  @Column()
  brandId: string[];

  @ManyToMany(() => Shop, shop => shop.products, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  shops: Shop[];

  @ManyToMany(() => Category, category => category.products, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  categories: Category[];
}
