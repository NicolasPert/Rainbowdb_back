import { Injectable } from '@nestjs/common';
// import { CreateColorDto } from './dto/create-color.dto';
// import { UpdateColorDto } from './dto/update-color.dto';
import { Colors } from './entities/color.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Colors)
    private colorsRepository: Repository<Colors>,
  ) {}

  findAll() {
    return this.colorsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} color`;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }
}
