import {Column, PrimaryGeneratedColumn} from 'typeorm';

export abstract class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  isVegan: boolean;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({nullable: true})
  email: string;

  @Column('bigint', {nullable: true})
  telephone: number;

  @Column('int', {nullable: true})
  rating: number;

  @Column('int', {nullable: true})
  userFavCount: number;

  @Column()
  thumbImg: string;

  @Column('text', {array: true, nullable: true})
  images: string[];
}
