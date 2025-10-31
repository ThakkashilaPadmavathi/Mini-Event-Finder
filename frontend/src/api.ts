import axios from 'axios';
import { Event } from './types/event';

const API_BASE = 'http://localhost:4000/api/events';

// Add this type
export type EventInput = Omit<Event, 'id'>;

export const fetchEvents = async (locationFilter?: string) => {
  const url = locationFilter ? `${API_BASE}?location=${locationFilter}` : API_BASE;
  const res = await axios.get<Event[]>(url);
  return res.data;
};

export const fetchEvent = async (id: string) => {
  const res = await axios.get<Event>(`${API_BASE}/${id}`);
  return res.data;
};

export const createEvent = async (event: EventInput) => {
  const res = await axios.post<Event>(API_BASE, event);
  return res.data;
};