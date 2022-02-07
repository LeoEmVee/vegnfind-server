import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column('text', {array: true, nullable: true})
  images?: string[];

  @Column('int', {nullable: true})
  rating?: number;

  @Column('int', {nullable: true})
  userFavCount?: number;

  @ManyToMany(() => Favourites, favourites => favourites.products, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'favourites_to_product'})
  favourites?: Favourites;

  @OneToMany(() => Review, review => review.product, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({name: 'reviews'})
  reviews?: Review[];

  @ManyToOne(() => Brand, brand => brand.products, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({name: 'brand'})
  brand?: Brand;

  @ManyToMany(() => Shop, shop => shop.products, {
    cascade: ['insert', 'update'],
  })
  shops?: Shop[];

  @ManyToMany(() => Category, category => category.products, {
    cascade: ['insert', 'update'],
  })
  categories?: Category[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
