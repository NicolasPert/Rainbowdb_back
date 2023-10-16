import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pictures } from './entities/picture.entity';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: 'uploads',
    }),
    TypeOrmModule.forFeature([Pictures]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
