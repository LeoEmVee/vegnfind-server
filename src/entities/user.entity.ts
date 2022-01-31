import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import {Review} from './review.entity';
import {Favourites} from './favourites.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profilePic: string;

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToOne(() => Favourites, favourites => favourites.user)
  @JoinColumn()
  favourites: Favourites;
}
