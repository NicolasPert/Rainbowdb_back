import { Characters } from 'src/characters/entities/character.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'univers' })
export class Univers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Characters)
  @JoinTable({
    name: 'belong',
    joinColumn: {
      name: 'id_univers',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_characters',
      referencedColumnName: 'id',
    },
  })
  belong: Characters[];
}
