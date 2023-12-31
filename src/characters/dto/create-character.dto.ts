import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  picture: {
    id: number;
  };
}
