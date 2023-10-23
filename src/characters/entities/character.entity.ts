import { Colors } from 'src/colors/entities/color.entity';
import { Movies } from 'src/movies/entities/movie.entity';
import { Pictures } from 'src/pictures/entities/picture.entity';
import { Univers } from 'src/univers/entities/univer.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Characters {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  id_pictures: number;

  @ManyToMany(() => Movies, (movies) => movies.name, { eager: true })
  @JoinTable({
    name: 'to_in',
    joinColumn: {
      name: 'id_characters',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_movies',
      referencedColumnName: 'id',
    },
  })
  to_in: Movies[];

  @ManyToMany(() => Univers, (univers) => univers.name, { eager: true })
  @JoinTable({
    name: 'belong',
    joinColumn: {
      name: 'id_characters',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_univers',
      referencedColumnName: 'id',
    },
  })
  belong: Univers[];

  @ManyToMany(() => Colors, (colors) => colors.name, { eager: true })
  @JoinTable({
    name: 'to_own',
    joinColumn: {
      name: 'id_characters',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_colors',
      referencedColumnName: 'id',
    },
  })
  to_own: Colors[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'to_like',
    joinColumn: {
      name: 'id_characters',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_users',
      referencedColumnName: 'id',
    },
  })
  to_like: User[];

  @OneToOne(() => Pictures, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'id_pictures' })
  picture: Pictures;
}
