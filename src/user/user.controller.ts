import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('current')
  @UseGuards(AuthGuard())
  findOne(@GetUser() user: User) {
    return this.userService.findOne(user.id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    console.log(user);
    return this.userService.update(+id, updateUserDto);
  }
}
