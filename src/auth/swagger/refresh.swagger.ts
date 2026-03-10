import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

export function RefreshSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh access and refresh tokens' }),
    ApiBody({
      description: 'Refresh token payload',
      type: RefreshTokenDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Tokens successfully refreshed',
    }),
    ApiResponse({
      status: 401,
      description: 'Invalid or expired refresh token',
    }),
  );
}
