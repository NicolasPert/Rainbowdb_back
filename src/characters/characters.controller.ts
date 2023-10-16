import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  // @UseGuards(AuthGuard())
  create(
    @Body() createCharacterDto: CreateCharacterDto,
    @GetUser() user: User,
  ) {
    if (!user.admin) {
      throw new UnauthorizedException('Droits admin nécéssaires');
    }
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @GetUser() user: User,
  ) {
    if (!user.admin) {
      throw new UnauthorizedException('Droits admin nécessaires');
    }
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string, @GetUser() user: User) {
    if (!user.admin) {
      throw new UnauthorizedException('Droits admin nécessaires');
    }
    return this.charactersService.remove(+id);
  }
}
