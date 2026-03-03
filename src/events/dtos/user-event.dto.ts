import { Expose } from 'class-transformer';

export class UserEventDto {
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
  joinedAt: Date;
}
