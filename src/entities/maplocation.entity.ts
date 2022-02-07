import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import {Eat} from './eat.entity';
import {Shop} from './shop.entity';

@Entity()
export class Maplocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'float'})
  latitude: number;

  @Column({type: 'float'})
  longitude: number;

  @Column()
  address: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @OneToOne(() => Shop, shop => shop.location) // having 2 entities we can keep track of shops locations and eats locations
  shop?: Shop;

  @OneToOne(() => Eat, eat => eat.location)
  eat?: Eat;
}
