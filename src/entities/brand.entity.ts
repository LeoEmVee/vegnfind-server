import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import {Eat} from './eat.entity';
import {Product} from './product.entity';
import {Shop} from './shop.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.brand, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.brands, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  shops?: Shop[];

  @ManyToMany(() => Eat, eat => eat.brands, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  eats?: Eat[];
}
