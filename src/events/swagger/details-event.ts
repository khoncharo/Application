import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchEventDto } from '../dtos/patch-event.dto';

export function EventDetailsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get detailed information about an event' }),

    ApiResponse({
      status: 200,
      description: 'Detailed event returned successfully',
      type: PatchEventDto,
      schema: {
        example: {
          id: '6e16c90c-de15-49c9-ad47-7eb332f24654',
          name: 'Public Event Example',
          description: 'Public Event with tea and cookies',
          location: 'Lutsk',
          dateTime: '2026-04-15T18:00:00.000Z',
          capacity: 50,
          participantsCount: 1,
          createdAt: '2026-03-01T10:00:00.000Z',
          updatedAt: '2026-03-01T12:00:00.000Z',
          participants: [
            {
              id: 'b460f7c4-2828-4b31-b5b3-bb6222343af2',
              firstName: 'Marie',
              lastName: 'Doe',
              email: 'marie.doe@email.com',
            },
          ],
        },
      },
    }),

    ApiResponse({
      status: 404,
      description: 'Event not found',
    }),
  );
}
