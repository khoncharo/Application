import {
  Body,
  Controller,
  Patch,
  Post,
  Get,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { PatchEventDto } from './dtos/patch-event.dto';
import { EventDetailsDto } from './dtos/get-event.dto';
import { plainToInstance } from 'class-transformer';

@Controller('events')
@Auth(AuthType.Bearer)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  public create(
    @Body() createEventDto: CreateEventDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.eventsService.create(createEventDto, user);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() patchEventDto: PatchEventDto) {
    return this.eventsService.update({ ...patchEventDto, id });
  }

  @Get()
  public findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post(':id/join')
  public join(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.eventsService.join(id, user);
  }

  @Post(':id/leave')
  public leave(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.eventsService.leave(id, user);
  }

  @Delete(':id')
  public delete(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.eventsService.delete(id, user);
  }

  @Get(':id/details')
  @UseInterceptors(ClassSerializerInterceptor)
  public async findDetails(@Param('id') id: string) {
    const event = await this.eventsService.findDetails(id);
    return plainToInstance(EventDetailsDto, event, {
      excludeExtraneousValues: true,
    });
  }
}
