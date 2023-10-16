import { Characters } from 'src/characters/entities/character.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pictures' })
export class Pictures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  description: string;

  @Column()
  mimetype: string;

  @OneToOne(() => Characters, (character) => character.picture)
  character: Characters;
}
