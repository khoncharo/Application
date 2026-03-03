import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PrismaService } from 'src/prisma/providers/prisma.service';
import { User } from '../entities/user.entity';
import { BcryptService } from 'src/bcrypting/providers/bcrypt.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const isExistingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (isExistingUser) {
      throw new ConflictException('Email is taken.');
    }

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await this.bcryptService.hashPassword(createUserDto.password),
      },
    });
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async findOneById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
