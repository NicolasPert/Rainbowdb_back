import { Characters } from 'src/characters/entities/character.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'movies' })
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Characters)
  @JoinTable({
    name: 'to_in',
    joinColumn: {
      name: 'id_movies',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_characters',
      referencedColumnName: 'id',
    },
  })
  to_in: Characters[];
}
