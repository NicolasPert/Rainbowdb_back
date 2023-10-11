import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Picture {
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
}
