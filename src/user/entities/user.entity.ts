import { Characters } from 'src/characters/entities/character.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @ManyToMany(() => Characters, { eager: true })
  @JoinTable({
    name: 'to_like',
    joinColumn: {
      name: 'id_users',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_characters',
      referencedColumnName: 'id',
    },
  })
  to_likes: Characters[];
}
