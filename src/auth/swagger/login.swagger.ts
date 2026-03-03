import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateAuthDto } from '../dtos/createa-auth.dto';

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'User login' }),

    ApiBody({
      type: CreateAuthDto,
      examples: {
        default: {
          summary: 'Login example',
          value: {
            email: 'user@example.com',
            password: 'StrongPassword123!',
          },
        },
      },
    }),

    ApiResponse({
      status: 200,
      description: 'Login successful',
      schema: {
        example: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: '87fd82c2-8451-4d7d-b628-328162e9b579',
            email: 'user@example.com',
            fullName: 'Marie Doe',
          },
        },
      },
    }),

    ApiResponse({
      status: 401,
      description: 'Invalid credentials',
    }),
  );
}
