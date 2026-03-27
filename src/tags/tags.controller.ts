import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateTagDto } from './dtos/create-tag.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @Auth(AuthType.Bearer)
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.findOrCreate(createTagDto);
  }

  @Get()
  @Auth(AuthType.None)
  public findAll() {
    return this.tagsService.findAll();
  }
}
