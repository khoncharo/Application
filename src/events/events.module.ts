import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from 'src/auth/guards/authentification.guard';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard, // ← global guard that handles @Auth() decorator
    },
  ],
  imports: [AuthModule],
})
export class EventsModule {}
