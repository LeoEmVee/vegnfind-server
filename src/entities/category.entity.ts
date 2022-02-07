import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
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
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_product'})
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.categories, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_shop'})
  shops?: Shop[];

  @ManyToMany(() => Eat, eat => eat.categories, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_eat'})
  eats?: Eat[];
}
