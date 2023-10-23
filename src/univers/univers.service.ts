import { Injectable } from '@nestjs/common';
import { CreateUniverDto } from './dto/create-univer.dto';
import { UpdateUniverDto } from './dto/update-univer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Univers } from './entities/univer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UniversService {
  constructor(
    @InjectRepository(Univers)
    private universRepository: Repository<Univers>,
  ) {}

  async create(createUniverDto: CreateUniverDto) {
    const movie = this.universRepository.create(createUniverDto);
    const result = await this.universRepository.save(movie);
    return result;
  }

  findAll() {
    return this.universRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} univer`;
  }

  update(id: number, updateUniverDto: UpdateUniverDto) {
    return `This action updates a #${id} univer`;
  }

  remove(id: number) {
    return `This action removes a #${id} univer`;
  }
}
