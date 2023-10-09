import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniversService } from './univers.service';
import { CreateUniverDto } from './dto/create-univer.dto';
import { UpdateUniverDto } from './dto/update-univer.dto';

@Controller('univers')
export class UniversController {
  constructor(private readonly universService: UniversService) {}

  @Post()
  create(@Body() createUniverDto: CreateUniverDto) {
    return this.universService.create(createUniverDto);
  }

  @Get()
  findAll() {
    return this.universService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniverDto: UpdateUniverDto) {
    return this.universService.update(+id, updateUniverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universService.remove(+id);
  }
}
