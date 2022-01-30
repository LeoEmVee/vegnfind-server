import {Column, PrimaryGeneratedColumn} from 'typeorm';

export abstract class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isVegan: boolean;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  email: string;

  @Column()
  telephone: number;

  @Column('int')
  rating: number;

  @Column('int')
  userFavCount: number;

  @Column()
  thumbImg: URL;

  @Column()
  images: URL[];
}
