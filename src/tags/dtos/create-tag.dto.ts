import { IsString, Length, Matches } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @Length(2, 30, { message: 'Tag name must be between 2 and 30 characters' })
  @Matches(/^[a-zA-Z0-9 _-]+$/, {
    message:
      'Tag name can only contain letters, numbers, spaces, hyphens, and underscores',
  })
  name: string;
}
