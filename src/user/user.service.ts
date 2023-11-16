import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Characters } from 'src/characters/entities/character.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Characters)
    private characterRepository: Repository<Characters>,
  ) {}

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const found = await this.userRepository.findOneBy({ id });
    // console.log('Paramètre id reçu :', id);
    if (!found) {
      throw new NotFoundException(`User with the id ${id} not found`);
    }
    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const users = await this.findOne(id);
    console.log('celui qui faut pas', id);

    // if (users.to_likes) {
    users.to_likes = updateUserDto.to_likes;
    // }

    const updatedUser = this.userRepository.merge(users, updateUserDto);
    const result = await this.userRepository.save(updatedUser);
    console.log('celui qui faut pas 2', id);

    return result;
  }
}
