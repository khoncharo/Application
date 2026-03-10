import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export function LeaveEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Leave an event' }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'Left event successfully' }),
  );
}
