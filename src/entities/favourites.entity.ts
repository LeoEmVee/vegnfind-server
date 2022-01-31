import {Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany} from 'typeorm';
import {User} from './user.entity';
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

  @ManyToMany(() => Shop, shop => shop.favourites, {onDelete: 'CASCADE'})
  shopping: Shop[];

  @ManyToMany(() => Eat, eat => eat.favourites, {onDelete: 'CASCADE'})
  eating: Eat[];

  @OneToOne(() => User, user => user.favourites, {onDelete: 'CASCADE'})
  user: User;
}
