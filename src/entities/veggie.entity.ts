import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {IsEmail} from 'class-validator';
import {Review} from './review.entity';
import {Favourites} from './favourites.entity';

// a Veggie is the user of the app
@Entity()
export class Veggie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column({nullable: true})
  description: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  profilePic: string;

  @OneToMany(() => Review, review => review.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({name: 'reviews'})
  reviews?: Review[];

  @OneToOne(() => Favourites, favourites => favourites.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  favourites?: Favourites;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
