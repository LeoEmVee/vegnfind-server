import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
<<<<<<< HEAD
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn,
=======
  OneToMany,
  JoinTable,
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
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
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_product'})
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.categories, {
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_shop'})
  shops?: Shop[];

  @ManyToMany(() => Eat, eat => eat.categories, {
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'category_to_eat'})
  eats?: Eat[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
