import { Characters } from 'src/characters/entities/character.entity';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  admin: boolean;
  character?: Characters[];
}
