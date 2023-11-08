import { IsInt } from 'class-validator';

export class ColorsDto {
  @IsInt()
  id: number;
}
