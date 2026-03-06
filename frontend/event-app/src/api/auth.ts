import { apiClient } from './client';
import type { AuthTokens, LoginDto, RegisterDto, User } from '../types';

export const login = async (dto: LoginDto): Promise<AuthTokens> => {
  const res = await apiClient.post<AuthTokens>('/auth/login', dto);
  return res.data;
};

export const register = async (dto: RegisterDto): Promise<User> => {
  const res = await apiClient.post<User>('/users', dto);
  return res.data;
};
