import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
