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
    cascade: ['insert', 'update'],
  })
  user: Veggie;

  @ManyToOne(() => Product, product => product.reviews, {
    cascade: ['insert', 'update'],
  })
  product?: Product;

  @ManyToOne(() => Shop, shop => shop.reviews, {
    cascade: ['insert', 'update'],
  }) // if I use the Business abstract for the OneToMany, we can make Review.shop and Review.eat into a single Review.business
  shop?: Shop;

  @ManyToOne(() => Eat, eat => eat.reviews, {
    cascade: ['insert', 'update'],
  })
  eat?: Eat;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
