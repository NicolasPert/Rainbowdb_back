import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Characters } from './entities/character.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { PicturesService } from 'src/pictures/pictures.service';
import { Pictures } from 'src/pictures/entities/picture.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Characters)
    private characterRepository: Repository<Characters>,
    @InjectRepository(Pictures)
    private picturesRepository: Repository<Pictures>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    console.log(character);

    try {
      return await this.characterRepository.save(character);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la création du personnage',
      );
    }
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
    const character = await this.characterRepository.findOne({ where: { id } });

    if (!character) {
      throw new NotFoundException(`Le character ${id} n'existe pas.`);
    }

    if (updateCharacterDto.picture) {
      const idPicture = updateCharacterDto.picture.id;
      const picture: Pictures = await this.picturesRepository.findOne({
        where: { id: idPicture },
      });
      character.picture = picture;
    }

    if (updateCharacterDto.name) {
      character.name = updateCharacterDto.name;
    }

    if (updateCharacterDto.to_in) {
      character.to_in = updateCharacterDto.to_in;
    }
    if (updateCharacterDto.belong) {
      character.belong = updateCharacterDto.belong;
    }
    if (updateCharacterDto.to_own) {
      character.to_own = updateCharacterDto.to_own;
    }

    // Enregistrez les modifications dans la base de données
    await this.characterRepository.save(character);

    return character;
  }

  async remove(id: number) {
    const character = await this.findOne(id);
    const response = await this.characterRepository.remove(character);
    return response;
  }
}

// const result = await this.characterRepository.save(updateCharacter);
// return result;
