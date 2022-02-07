import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import {Veggie} from './veggie.entity';
import {Product} from './product.entity';
import {Shop} from './shop.entity';
import {Eat} from './eat.entity';

@Entity()
export class Favourites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Product, product => product.favourites, {
    onDelete: 'CASCADE',
  })
  products: Product[];

  @ManyToMany(() => Shop, shop => shop.favourites, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  shopping: Shop[];

  @ManyToMany(() => Eat, eat => eat.favourites, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  eating: Eat[];

  @OneToOne(() => Veggie, veggie => veggie.favourites, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn({name: 'user'})
  user: Veggie;
}
