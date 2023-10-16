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
      throw new NotFoundException(`Character with the id ${id} not found`);
    }
    return found;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.findOne(id);
    // if (updateCharacterDto.id_colors) {
    //   character.id_colors = updateCharacterDto.id_colors;
    // }

    // if (updateCharacterDto.id_movies) {
    //   character.id_movies = updateCharacterDto.id_movies;
    // }

    // if (updateCharacterDto.id_univers) {
    //   character.id_univers = updateCharacterDto.id_univers;
    // }

    // if (updateCharacterDto.id_pitures) {
    //   character.id_pictures = updateCharacterDto.id_pitures;
    // }

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
