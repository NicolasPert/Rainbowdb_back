import { Characters } from 'src/characters/entities/character.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'colors' })
export class Colors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Characters)
  @JoinTable({
    name: 'to_own',
    joinColumn: {
      name: 'id_colors',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_characters',
      referencedColumnName: 'id',
    },
  })
  to_own: Characters[];
}
