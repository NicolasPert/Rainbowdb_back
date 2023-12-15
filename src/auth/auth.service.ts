import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Method for registering a new user
  async register(createAuthDto: CreateAuthDto) {
    const { username, email, password, admin } = createAuthDto; // creation of my destructured constant

    // Hashing the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a user entity
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      admin: false,
    });

    try {
      // Saving the user entity to the database
      const createdUser = await this.userRepository.save(user);

      // Removing the password from the response
      delete createdUser.password;

      // Returning the created user
      return createdUser;
    } catch (error) {
      // Handling errors during registration
      if (error.code === '23505') {
        // Conflict error if the email already exists in the database
        throw new ConflictException('email already exists');
      } else {
        // Internal server error for other errors
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'These credentials are incorrect, sorry...',
      );
    }
  }
}
