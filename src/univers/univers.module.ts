import { Module } from '@nestjs/common';
import { UniversService } from './univers.service';
import { UniversController } from './univers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Univer } from './entities/univer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Univer])],

  controllers: [UniversController],
  providers: [UniversService],
})
export class UniversModule {}
