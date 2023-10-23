import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characters } from 'src/characters/entities/character.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Characters)
    private characterRepository: Repository<Characters>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Character with the id ${id} not found`);
    }
    return found;
  }

  async update(userId: number, characterId: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.to_likes', 'character')
      .where('user.id = :userId', { userId })
      .getOne();
    console.log(user);
    if (!user) {
      throw new NotFoundException(
        `L'utilisateur avec l'id  ${userId} n'a pas été trouvé`,
      );
    }
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
    });
    if (!character) {
      throw new NotFoundException(
        `le character avec l'id  ${characterId} n'a pas été trouvé`,
      );
    }

    user.to_likes.push(character);
    console.log('ceci est mon log', user);
    return this.userRepository.save(user);
  }

  async delete(userId: number, characterId: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.to_likes', 'character')
      .where('user.id = :userId', { userId })
      .getOne();
    console.log('kesako', user);

    if (!user) {
      throw new NotFoundException(
        `L'utilisateur avec l'ID ${userId} n'a pas été trouvé.`,
      );
    }

    // Vérifiez si l'utilisateur a le personnage dans ses favoris
    const characterIndex = user.to_likes.findIndex(
      (character) => character.id === characterId,
    );

    if (characterIndex === -1) {
      throw new NotFoundException(
        `Le personnage avec l'ID ${characterId} n'a pas été trouvé dans les favoris de l'utilisateur.`,
      );
    }

    // Supprimez le personnage des favoris de l'utilisateur
    user.to_likes.splice(characterIndex, 1);

    // Enregistrez les modifications dans la base de données
    return this.userRepository.save(user);
  }
}
