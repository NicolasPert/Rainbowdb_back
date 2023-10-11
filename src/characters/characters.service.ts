import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    const result = await this.characterRepository.save(character);
    return result;
  }

  findAll() {
    return `This action returns all characters`;
  }

  async findOne(id: number) {
    const found = await this.characterRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Character with the id ${id} not found`);
    }
    return found;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
