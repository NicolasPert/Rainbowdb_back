import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CharactersModule } from './characters/characters.module';
import { PicturesModule } from './pictures/pictures.module';
import { ColorsModule } from './colors/colors.module';
import { UniversModule } from './univers/univers.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './characters/entities/character.entity';
import { User } from './user/entities/user.entity';
import { Color } from './colors/entities/color.entity';
import { Movie } from './movies/entities/movie.entity';
import { Picture } from './pictures/entities/picture.entity';
import { Univer } from './univers/entities/univer.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Character, Color, Movie, Picture, Univer, User],
      synchronize: false,
    }),
    UserModule,
    CharactersModule,
    PicturesModule,
    ColorsModule,
    UniversModule,
    MoviesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
