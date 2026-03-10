import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export function DeleteEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete an event' }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'Event deleted successfully' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
  );
}
