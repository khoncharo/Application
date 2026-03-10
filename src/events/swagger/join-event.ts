import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export function JoinEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Join an event' }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'Joined event successfully' }),
  );
}
