import { apiClient } from './client';
import type { Event, EventDetails, UserEvent, CreateEventDto, PatchEventDto } from '../types';

export const getEvents = async (): Promise<Event[]> => {
  const res = await apiClient.get<Event[]>('/events');
  return res.data;
};

export const getEvent = async (id: string): Promise<Event> => {
  const res = await apiClient.get<Event>(`/events/${id}`);
  return res.data;
};

export const getEventDetails = async (id: string): Promise<EventDetails> => {
  const res = await apiClient.get<EventDetails>(`/events/${id}/details`);
  return res.data;
};

export const getMyEvents = async (): Promise<UserEvent[]> => {
  const res = await apiClient.get<UserEvent[]>('/events/me');
  return res.data;
};

export const createEvent = async (dto: CreateEventDto): Promise<Event> => {
  const res = await apiClient.post<Event>('/events', dto);
  return res.data;
};

export const updateEvent = async (id: string, dto: PatchEventDto): Promise<Event> => {
  const res = await apiClient.patch<Event>(`/events/${id}`, dto);
  return res.data;
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
