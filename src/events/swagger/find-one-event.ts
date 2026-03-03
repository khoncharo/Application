import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindOneEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get event by id' }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'Event returned successfully' }),
    ApiResponse({ status: 404, description: 'Event not found' }),
  );
}
