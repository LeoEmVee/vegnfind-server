import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import {Product} from './product.entity';
import {Shop} from './shop.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.brand)
  products: Product[];

  @ManyToMany(() => Shop, shop => shop.brands)
  shops: Shop[];
}
