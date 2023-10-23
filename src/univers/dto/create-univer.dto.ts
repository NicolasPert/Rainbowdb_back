import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUniverDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
