import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
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
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  products?: Product[];

  @ManyToMany(() => Shop, shop => shop.brands, {
<<<<<<< HEAD
=======
    onDelete: 'CASCADE',
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
    cascade: ['insert', 'update'],
  })
  shops?: Shop[];

  @ManyToMany(() => Eat, eat => eat.brands, {
<<<<<<< HEAD
    cascade: ['insert', 'update'],
  })
  eats?: Eat[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
=======
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  eats?: Eat[];
>>>>>>> c1a3a04761aa1bceb0c07c9adfa17e61a195c88b
}
