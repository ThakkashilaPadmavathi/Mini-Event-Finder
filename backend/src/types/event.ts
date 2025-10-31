export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string; // ISO format
  maxParticipants: number;
  currentParticipants: number;
}