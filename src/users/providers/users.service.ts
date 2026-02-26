import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FindOneUserByEmailProvider } from './find-user-by-email.provider';
import { FindOneUserByIdProvider } from './find-user-by-id.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    private readonly findOneUserByIdProvider: FindOneUserByIdProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {}

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  public async findOneById(id: string) {
    return await this.findOneUserByIdProvider.findOneById(id);
  }
}
