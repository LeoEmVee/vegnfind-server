import {Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany} from 'typeorm';
import {User} from './user.entity';
import {Product} from './product.entity';
import {Shop} from './shop.entity';
import {Eat} from './eat.entity';

@Entity()
export class Favourites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Product, product => product.favourites)
  products: Product[];

  @ManyToMany(() => Shop, shop => shop.favourites)
  shopping: Shop[];

  @ManyToMany(() => Eat, eat => eat.favourites)
  eating: Eat[];

  @OneToOne(() => User, user => user.favourites)
  user: User;
}
