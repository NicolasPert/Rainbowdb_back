import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { FavorisDto } from './dto/favoris.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id/favorites')
  updateFavorites(
    @Param('id') id: string,
    @Body() data: { characterId: number; action: 'add' | 'remove' },
  ) {
    if (data.action === 'add') {
      //si je mets add et le characterID que je veux cela va mettre le character en favoris sur le user
      return this.userService.update(+id, data.characterId);
    } else if (data.action === 'remove') {
      // si je mets remove et le characterID cela va enlever le favoris sur le user
      return this.userService.delete(+id, data.characterId);
    }
    return 'Action complete'; // Réponse de confirmation
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
