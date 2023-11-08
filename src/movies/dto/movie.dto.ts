import { IsInt } from 'class-validator';

export class MovieDto {
  @IsInt()
  id: number;
}
