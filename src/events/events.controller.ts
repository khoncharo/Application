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
import { ApiTags } from '@nestjs/swagger';
import { CreateEventSwagger } from './swagger/create-event';
import { UpdateEventSwagger } from './swagger/update-event';
import { FindAllEventsSwagger } from './swagger/find-events';
import { EventDetailsSwagger } from './swagger/details-event';
import { FindOneEventSwagger } from './swagger/find-one-event';
import { LeaveEventSwagger } from './swagger/leave-event';
import { JoinEventSwagger } from './swagger/join-event';
import { DeleteEventSwagger } from './swagger/delete-event';
import { GetMyEventsSwagger } from './swagger/user-event';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @CreateEventSwagger()
  @Auth(AuthType.Bearer)
  public create(
    @Body() createEventDto: CreateEventDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.eventsService.create(createEventDto, user);
  }

  @Post(':id/join')
  @JoinEventSwagger()
  @Auth(AuthType.Bearer)
  public join(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.eventsService.join(id, user);
  }

  @Post(':id/leave')
  @LeaveEventSwagger()
  @Auth(AuthType.Bearer)
  public leave(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.eventsService.leave(id, user);
  }

  @Patch(':id')
  @UpdateEventSwagger()
  @Auth(AuthType.Bearer)
  public update(@Param('id') id: string, @Body() patchEventDto: PatchEventDto) {
    return this.eventsService.update(id, patchEventDto);
  }

  @Get()
  @FindAllEventsSwagger()
  @Auth(AuthType.None)
  public findAll() {
    return this.eventsService.findAll();
  }

  @Get('me')
  @GetMyEventsSwagger()
  @Auth(AuthType.Bearer)
  public getMyEvents(@ActiveUser() user: ActiveUserData) {
    return this.eventsService.findUserEvents(user);
  }

  @Get(':id')
  @FindOneEventSwagger()
  @Auth(AuthType.None)
  public findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Get(':id/details')
  @EventDetailsSwagger()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findDetails(@Param('id') id: string) {
    const event = await this.eventsService.findDetails(id);
    return plainToInstance(EventDetailsDto, event, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @DeleteEventSwagger()
  @Auth(AuthType.Bearer)
  public delete(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.eventsService.delete(id, user);
  }
}
