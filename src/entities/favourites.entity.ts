import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
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
    cascade: ['insert', 'update'],
  })
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.favourites, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'favourites_to_shop'})
  shopping?: Shop[];

  @ManyToMany(() => Eat, eat => eat.favourites, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'favourites_to_eat'})
  eating?: Eat[];

  @OneToOne(() => Veggie, veggie => veggie.favourites, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({name: 'user'})
  user: Veggie;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
