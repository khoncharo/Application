import { EventType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

export class UserDto {
  @Expose() id: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() email: string;
}

export class TagDto {
  @Expose() id: string;
  @Expose() name: string;
}

export class EventDetailsDto {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() description: string;
  @Expose() dateTime: Date;
  @Expose() location: string;
  @Expose() capacity: number | null;
  @Expose() type: EventType;
  @Expose() userId: string;
  @Expose() participantCount: number;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => UserDto)
  participants: UserDto[];

  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];
}
