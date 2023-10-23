import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Characters } from 'src/characters/entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Characters])],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
