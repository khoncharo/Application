import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateEventDto } from 'src/events/dtos/create-event.dto';

export function CreateEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new event' }),
    ApiBearerAuth(),
    ApiBody({
      type: CreateEventDto,
      examples: {
        basic: {
          summary: 'Event example',
          value: {
            name: 'Public event',
            description: 'Public event with coffee and cake',
            location: 'Lutsk',
            dateTime: '2026-04-15T18:00:00.000Z',
            type: 'PUBLIC',
            capacity: 50,
          },
        },
      },
    }),

    ApiResponse({ status: 201, description: 'Event created successfully' }),
    ApiResponse({ status: 400, description: 'Invalid input' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
