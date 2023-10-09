import { PartialType } from '@nestjs/mapped-types';
import { CreateUniverDto } from './create-univer.dto';

export class UpdateUniverDto extends PartialType(CreateUniverDto) {}
