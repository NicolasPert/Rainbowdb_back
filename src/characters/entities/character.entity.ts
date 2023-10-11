import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  movie: string;

  @Column()
  univers: string;

  @Column()
  id_pitures: number;

  @Column()
  id_colors: number;
}
