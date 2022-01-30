import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import {Eat} from './eat.entity';
import {Product} from './product.entity';
import {Shop} from './shop.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Product, product => product.categories)
  products: Product[];

  @ManyToMany(() => Shop, shop => shop.categories)
  shops: Shop[];

  @ManyToMany(() => Eat, eat => eat.categories)
  eats: Eat[];
}
