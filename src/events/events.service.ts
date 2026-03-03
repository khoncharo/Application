import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PrismaService } from 'src/prisma/providers/prisma.service';
import { PatchEventDto } from './dtos/patch-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createEventDto: CreateEventDto, user: ActiveUserData) {
    return await this.prisma.event.create({
      data: {
        ...createEventDto,
        userId: user.sub,
      },
    });
  }

  public async update(patchEventDto: PatchEventDto) {
    const { id, ...data } = patchEventDto;

    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    return await this.prisma.event.update({
      where: { id },
      data,
    });
  }

  public async delete(id: string, user: ActiveUserData) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    if (event.userId !== user.sub) {
      throw new ForbiddenException('You are not allowed to delete this event');
    }

    await this.prisma.event.delete({ where: { id } });

    return { deleted: true, id };
  }

  public async findAll() {
    return await this.prisma.event.findMany({
      include: {
        _count: {
          select: { participants: true },
        },
      },
    });
  }

  public async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: { participants: true },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  public async join(id: string, user: ActiveUserData) {
    const event = await this.findOne(id);

    if (event.capacity && event._count.participants >= event.capacity) {
      throw new ConflictException('Event is full');
    }

    const alreadyJoined = await this.prisma.participant.findUnique({
      where: {
        userId_eventId: {
          userId: user.sub,
          eventId: id,
        },
      },
    });

    if (alreadyJoined) {
      throw new ConflictException('You have already joined this event');
    }

    return await this.prisma.participant.create({
      data: {
        userId: user.sub,
        eventId: id,
      },
    });
  }

  public async leave(id: string, user: ActiveUserData) {
    const participant = await this.prisma.participant.findUnique({
      where: {
        userId_eventId: {
          userId: user.sub,
          eventId: id,
        },
      },
    });

    if (!participant) {
      throw new NotFoundException('You are not a participant of this event');
    }

    await this.prisma.participant.delete({
      where: {
        userId_eventId: {
          userId: user.sub,
          eventId: id,
        },
      },
    });

    return { left: true, eventId: id };
  }

  public async findDetails(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        user: true,
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: { participants: true },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const { _count, participants, ...rest } = event;

    return {
      ...rest,
      participantCount: _count.participants,
      participants: participants.map(({ user }) => user),
    };
  }
}
