import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characters } from './entities/character.entity';
import { Movies } from 'src/movies/entities/movie.entity';
import { Univers } from 'src/univers/entities/univer.entity';
import { Colors } from 'src/colors/entities/color.entity';
import { Pictures } from 'src/pictures/entities/picture.entity';
// import { PicturesService } from 'src/pictures/pictures.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Characters]),
    TypeOrmModule.forFeature([Movies]),
    TypeOrmModule.forFeature([Univers]),
    TypeOrmModule.forFeature([Colors]),
    TypeOrmModule.forFeature([Pictures]),
  ],

  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
