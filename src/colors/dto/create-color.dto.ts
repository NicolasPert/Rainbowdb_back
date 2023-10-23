import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(8)
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
