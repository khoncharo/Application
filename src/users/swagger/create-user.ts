import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';

export function CreateUserSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),

    ApiBody({
      type: CreateUserDto,
      examples: {
        default: {
          summary: 'User registration example',
          value: {
            email: 'newuser@example.com',
            password: 'StrongPassword123!',
            firstName: 'Jane',
            lastName: 'Doe',
          },
        },
      },
    }),

    ApiResponse({
      status: 201,
      description: 'User created successfully',
      schema: {
        example: {
          id: '86fd82c2-8451-4d7d-b628-328162e9b579',
          email: 'newuser@example.com',
          firstName: 'Jane',
          lastName: 'Doe',
          passwrod:
            '$2b$10$z96w1pGDqV7Z7degVfY.8eZgBo1PXPnbXJqnPJVmGftPeJppnkNkW',
          createdAt: '2026-03-01T12:00:00.000Z',
          updatedAt: '2026-03-01T12:00:00.000Z',
        },
      },
    }),

    ApiResponse({
      status: 400,
      description: 'Validation error',
    }),
  );
}
