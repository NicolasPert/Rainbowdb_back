import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private moviesRepository: Repository<Movies>,
  ) {}
  async createMovies(createMovieDto: CreateMovieDto) {
    const movie = this.moviesRepository.create(createMovieDto);
    const result = await this.moviesRepository.save(movie);
    return result;
  }

  findAll() {
    return this.moviesRepository.find();
  }

  async findOne(id: number) {
    const found = await this.moviesRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`le film avec l'id ${id} n'a pas été trouvé`);
    }
    return found;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);
    const updateMovie = this.moviesRepository.merge(movie, updateMovieDto);

    const result = await this.moviesRepository.save(updateMovie);
    return result;
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    const response = await this.moviesRepository.remove(movie);
    return response;
  }
}
