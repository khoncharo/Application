import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PrismaService } from 'src/prisma/providers/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createEventDto: CreateEventDto, user: ActiveUserData) {
    try {
      return await this.prisma.event.create({
        data: {
          ...createEventDto,
          userId: user.sub,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Event already exists');
      }
      console.error('Error creating event:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
