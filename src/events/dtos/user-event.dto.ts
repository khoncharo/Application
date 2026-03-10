import { EventType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

export class TagDto {
  @Expose() id: string;
  @Expose() name: string;
}

export class UserEventDto {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() description: string;
  @Expose() dateTime: Date;
  @Expose() location: string;
  @Expose() capacity: number;
  @Expose() joinedAt: Date;
  @Expose() type: EventType;

  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];
}
