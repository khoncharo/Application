import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class FindOneUserByIdProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneById(id: string) {
    let existingUser: User | null;

    try {
      existingUser = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        error,
        'Unable to proccess your request at the moment, please try later',
      );
    }

    if (!existingUser) {
      throw new UnauthorizedException('User does not exist');
    }
  }
}
