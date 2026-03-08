import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllEventsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all events' }),
    ApiResponse({ status: 200, description: 'List of events returned' }),
  );
}
