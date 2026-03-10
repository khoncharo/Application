import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PatchEventDto } from '../dtos/patch-event.dto';

export function UpdateEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Update an event' }),
    ApiBearerAuth(),
    ApiBody({
      type: PatchEventDto,
      examples: {
        updateMultipleFields: {
          summary: 'Updated Event example',
          value: {
            name: 'Updated Public event',
            description: 'Updated public event with tea and cookies',
            location: 'Kharkiv',
            dateTime: '2026-06-15T18:00:00.000Z',
            type: 'PUBLIC',
            capacity: 25,
          },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'Event updated successfully' }),
    ApiResponse({ status: 404, description: 'Event not found' }),
  );
}
