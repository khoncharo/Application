export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  capacity?: number | null;
  type: 'PUBLIC' | 'PRIVATE';
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    participants: number;
  };
}

export interface EventDetails {
  id: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  capacity?: number | null;
  type: 'PUBLIC' | 'PRIVATE';
  userId: string;
  participantCount: number;
  participants: User[];
  createdAt: string;
  updatedAt: string;
}

export interface UserEvent {
  id?: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  capacity?: number | null;
  joinedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateEventDto {
  name: string;
  description: string;
  dateTime: string;
  location: string;
  capacity?: number | null;
  type: 'PUBLIC' | 'PRIVATE';
}

export interface PatchEventDto {
  name?: string;
  description?: string;
  dateTime?: string;
  location?: string;
  capacity?: number | null;
  type?: 'PUBLIC' | 'PRIVATE';
}
