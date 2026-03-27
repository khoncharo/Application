import { apiClient } from './client';
import type {
  Event,
  EventDetails,
  UserEvent,
  CreateEventDto,
  PatchEventDto,
} from '../types';

function flattenTags(raw: any) {
  return raw.tags?.map((et: any) => et.tag ?? et).filter(Boolean) ?? [];
}

export const getEvents = async (): Promise<Event[]> => {
  const res = await apiClient.get<any[]>('/events');
  return res.data.map((e) => ({ ...e, tags: flattenTags(e) }));
};

export const getEvent = async (id: string): Promise<Event> => {
  const res = await apiClient.get<any>(`/events/${id}`);
  return { ...res.data, tags: flattenTags(res.data) };
};

export const getEventDetails = async (id: string): Promise<EventDetails> => {
  const res = await apiClient.get<any>(`/events/${id}/details`);
  return {
    ...res.data,
    type: res.data.type ?? res.data.eventType,
    tags: flattenTags(res.data),
  };
};

export const getMyEvents = async (): Promise<UserEvent[]> => {
  const res = await apiClient.get<any[]>('/events/me');
  return res.data.map((e) => ({ ...e, tags: flattenTags(e) }));
};

export const createEvent = async (dto: CreateEventDto): Promise<Event> => {
  const res = await apiClient.post<any>('/events', dto);
  return { ...res.data, tags: flattenTags(res.data) };
};

export const updateEvent = async (
  id: string,
  dto: PatchEventDto,
): Promise<Event> => {
  const res = await apiClient.patch<any>(`/events/${id}`, dto);
  return { ...res.data, tags: flattenTags(res.data) };
};

export const deleteEvent = async (id: string): Promise<void> => {
  await apiClient.delete(`/events/${id}`);
};

export const joinEvent = async (id: string): Promise<void> => {
  await apiClient.post(`/events/${id}/join`);
};

export const leaveEvent = async (id: string): Promise<void> => {
  await apiClient.post(`/events/${id}/leave`);
};
