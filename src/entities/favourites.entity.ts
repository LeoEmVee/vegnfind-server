import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
<<<<<<< HEAD
  CreateDateColumn,
  UpdateDateColumn,
=======
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
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
<<<<<<< HEAD
    cascade: ['insert', 'update'],
  })
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.favourites, {
=======
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'favourites_to_product'})
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.favourites, {
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'favourites_to_shop'})
  shopping?: Shop[];

  @ManyToMany(() => Eat, eat => eat.favourites, {
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'favourites_to_eat'})
  eating?: Eat[];

  @OneToOne(() => Veggie, veggie => veggie.favourites, {
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  @JoinColumn({name: 'user'})
  user: Veggie;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
