import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
