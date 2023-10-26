import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  id_movies: number;

  @IsNotEmpty()
  id_univers: number;

  @IsNotEmpty()
  id_pictures: number;

  @IsNotEmpty()
  id_colors: number;
}
