import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Characters } from 'src/characters/entities/character.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  to_likes: Characters[];
}
