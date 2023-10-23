import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
// import { UpdatePictureDto } from './dto/update-picture.dto';
import { Pictures } from './entities/picture.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Pictures)
    private picturesRepository: Repository<Pictures>,
  ) {}
  create(img: Express.Multer.File) {
    console.log('notre img' + img.originalname);
    return this.picturesRepository.save({
      name: img.filename,
      mimetype: img.mimetype,
      size: img.size,
      description: img.originalname,
    });
  }

  async getImage(res): Promise<StreamableFile> {
    const result = await this.picturesRepository.find();
    console.log(result);
    let imageFile;
    const imageTab = [];
    for (let i = 0; i < result.length; i++) {
      imageFile = createReadStream(
        join(process.cwd(), 'uploads', result[i].name),
      );
      res.set('Content-Type', result[i].mimetype);
      imageTab.push(imageFile);
    }
    console.log(imageTab[imageFile]);
    return new StreamableFile(imageFile);
  }

  async getImageById(id: number, res): Promise<StreamableFile> {
    const result = await this.picturesRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`La photo ${id}} n'as pas été trouvé !`);
    }
    const imageFile = createReadStream(
      join(process.cwd(), 'uploads', result.name),
    );
    res.set('Content-Type', result.mimetype);
    console.log('mon image', imageFile);
    return new StreamableFile(imageFile);
  }

  async getPicture(id: number) {
    await this.picturesRepository.findOneBy({ id });
  }

  update(id: number) {
    return `This action updates a #${id} picture`;
  }
  // updatePictureDto: UpdatePictureDto;

  async remove(id: number) {
    const pictureToRemove = await this.picturesRepository.findOneBy({ id });
    if (!pictureToRemove) {
      throw new Error(`L'image avec l'id number : ${id} est inexistante `);
    }
    await this.picturesRepository.remove(pictureToRemove);
    return;
  }
}
