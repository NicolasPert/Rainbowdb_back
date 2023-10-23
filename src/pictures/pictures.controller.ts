import {
  Controller,
  Get,
  Param,
  Res,
  StreamableFile,
  UploadedFile,
  Post,
  UseInterceptors,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePictureDto } from './dto/update-picture.dto';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('monFichier'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.picturesService.create(file);
  }

  @Get()
  async getPhotos(@Res({ passthrough: true }) res): Promise<StreamableFile> {
    return this.picturesService.getImage(res);
  }

  @Get(':id')
  getImageById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    return this.picturesService.getImageById(+id, res);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updatePicturesDto: UpdatePictureDto) {
    return this.picturesService.update(+id);
  }
  // updatePicturesDto;

  @Delete(':id')
  // @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.picturesService.remove(+id);
  }
}
