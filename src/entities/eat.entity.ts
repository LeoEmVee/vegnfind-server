import {
  Entity,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

import {Business} from './abstract/business';
import {Brand} from './brand.entity';
import {Category} from './category.entity';
import {Favourites} from './favourites.entity';
import {Maplocation} from './maplocation.entity';
import {Review} from './review.entity';

@Entity()
export class Eat extends Business {
  @Column({nullable: true})
  website?: string;

  @OneToOne(() => Maplocation, maplocation => maplocation.eat, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({name: 'location'})
  location: Maplocation;

  @OneToMany(() => Review, review => review.eat, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({name: 'reviews'})
  reviews?: Review[];

  // this allows us to separate on Category.shops / Category.eats
  @ManyToMany(() => Category, category => category.eats, {
    cascade: ['insert', 'update'],
  })
  categories?: Category[];

  @ManyToMany(() => Favourites, favourites => favourites.eating, {
    cascade: ['insert', 'update'],
  })
  favourites?: Favourites[];

  @ManyToMany(() => Brand, brand => brand.eats, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({name: 'eat_to_brand'})
  brands?: Brand[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
