import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import {Eat} from './eat.entity';
import {Product} from './product.entity';
import {Shop} from './shop.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @ManyToMany(() => Product, product => product.categories, {
    onDelete: 'CASCADE',
  })
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.categories, {onDelete: 'CASCADE'})
  shops?: Shop[];

  @ManyToMany(() => Eat, eat => eat.categories, {onDelete: 'CASCADE'})
  eats?: Eat[];
}
