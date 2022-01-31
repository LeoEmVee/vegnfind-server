import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
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

  @ManyToOne(() => Veggie, veggie => veggie.reviews)
  user: Veggie;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

  @ManyToOne(() => Shop, shop => shop.reviews) // if I use the Business abstract for the OneToMany, we can make Review.shop and Review.eat into a single Review.business
  shop: Shop;

  @ManyToOne(() => Eat, eat => eat.reviews)
  eat: Eat;
}
