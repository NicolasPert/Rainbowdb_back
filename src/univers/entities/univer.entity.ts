import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Univer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
