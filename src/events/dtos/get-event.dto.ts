import { Exclude, Expose, Type } from 'class-transformer';

export class ParticipantResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;
}

export class EventDetailsDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  dateTime: Date;

  @Expose()
  location: string;

  @Expose()
  capacity: number;

  @Expose()
  participantCount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ParticipantResponseDto)
  participants: ParticipantResponseDto[];

  @Exclude()
  user: any;

  @Exclude()
  userId: string;
}
