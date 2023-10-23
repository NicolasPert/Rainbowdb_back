import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(8)
  id_movies: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(8)
  id_univers: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(8)
  id_pitures: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(8)
  id_colors: number;
}
