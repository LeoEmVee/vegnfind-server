import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
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
    cascade: ['insert', 'update'],
  })
  products?: Product[];

  @ManyToOne(() => Shop, shop => shop.brand, {
    cascade: ['insert', 'update'],
  })
  shops?: Shop[];

  @ManyToMany(() => Eat, eat => eat.brands, {
    cascade: ['insert', 'update'],
  })
  eats?: Eat[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
