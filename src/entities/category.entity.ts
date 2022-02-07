import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn,
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
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_product'})
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.categories, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_shop'})
  shops?: Shop[];

  @ManyToMany(() => Eat, eat => eat.categories, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_eat'})
  eats?: Eat[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
