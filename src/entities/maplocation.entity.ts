import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import {Eat} from './eat.entity';
import {Shop} from './shop.entity';

@Entity()
export class MapLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  address: string;

  @Column()
  zipCode: number;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @OneToOne(() => Shop, shop => shop.location) // having 2 entities we can keep track of shops locations and eats locations
  shop: Shop;

  @OneToOne(() => Eat, eat => eat.location)
  eat: Eat;
}
