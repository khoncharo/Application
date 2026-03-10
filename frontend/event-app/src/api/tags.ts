import { apiClient } from './client';
import type { Tag } from '../types';

export const getTags = async (): Promise<Tag[]> => {
  const res = await apiClient.get<Tag[]>('/tags');
  return res.data;
};

export const createTag = async (name: string): Promise<Tag> => {
  const res = await apiClient.post<Tag>('/tags', { name });
  return res.data;
};
