import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characters } from './entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Characters])],

  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
