import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export function GetMyEventsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get events of the authenticated user' }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'List of user joined events',
      schema: {
        example: [
          {
            name: 'Public Event',
            description: 'Public event with coffee and cake',
            dateTime: '2026-04-15T18:00:00.000Z',
            location: 'Lutsk',
            capacity: null,
            joinedAt: '2026-03-03T14:26:39.000Z',
          },
        ],
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
  );
}
