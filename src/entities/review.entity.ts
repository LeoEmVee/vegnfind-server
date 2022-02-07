import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Veggie} from './veggie.entity';
import {Product} from './product.entity';
import {Shop} from './shop.entity';
import {Eat} from './eat.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  rating: number;

  @ManyToOne(() => Veggie, veggie => veggie.reviews, {
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  user: Veggie;

  @ManyToOne(() => Product, product => product.reviews, {
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  product?: Product;

  @ManyToOne(() => Shop, shop => shop.reviews, {
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  }) // if I use the Business abstract for the OneToMany, we can make Review.shop and Review.eat into a single Review.business
  shop?: Shop;

  @ManyToOne(() => Eat, eat => eat.reviews, {
<<<<<<< HEAD
    cascade: ['insert', 'update'],
  })
  eat?: Eat;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
=======
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  eat?: Eat;
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
}
