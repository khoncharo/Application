import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllEventsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all events' }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'List of events returned' }),
  );
}
