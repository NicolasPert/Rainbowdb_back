import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Characters } from './entities/character.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Characters)
    private characterRepository: Repository<Characters>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    const result = await this.characterRepository.save(character);
    return result;
  }

  findAll() {
    return this.characterRepository.find();
  }

  async findOne(id: number) {
    const found = await this.characterRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(
        `Le personnage avec l'id ${id} n'a pas été trouvé`,
      );
    }
    return found;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.findOne(id);

    const updateCharacter = this.characterRepository.merge(
      character,
      updateCharacterDto,
    );

    const result = await this.characterRepository.save(updateCharacter);
    return result;
  }

  async remove(id: number) {
    const character = await this.findOne(id);
    const response = await this.characterRepository.remove(character);
    return response;
  }
}
