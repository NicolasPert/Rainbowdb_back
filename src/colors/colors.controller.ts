import { Controller, Get, Param } from '@nestjs/common';
import { ColorsService } from './colors.service';
// import { CreateColorDto } from './dto/create-color.dto';
// import { UpdateColorDto } from './dto/update-color.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorsService.findOne(+id);
  }
}
