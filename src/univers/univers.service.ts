import { Injectable } from '@nestjs/common';
import { CreateUniverDto } from './dto/create-univer.dto';
import { UpdateUniverDto } from './dto/update-univer.dto';

@Injectable()
export class UniversService {
  create(createUniverDto: CreateUniverDto) {
    return 'This action adds a new univer';
  }

  findAll() {
    return `This action returns all univers`;
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
