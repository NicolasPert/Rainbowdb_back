import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Movies } from 'src/movies/entities/movie.entity';
import { Univers } from 'src/univers/entities/univer.entity';
import { Colors } from 'src/colors/entities/color.entity';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  to_in: Movies[];

  belong: Univers[];

  to_own: Colors[];
}
