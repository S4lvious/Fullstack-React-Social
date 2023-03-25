//import { Transform } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  //OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  website: string;

  @Column({ default: null })
  city: string;

  @Column({ default: null })
  profilePic: string;

  @Column({ default: null })
  coverPic: string;

  //@Transform(({ value }) => value.id)
  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  followedBy: User[];

  //@Transform(({ value }) => value.id)
  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  following: User[];
}
