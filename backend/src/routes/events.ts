import express from 'express';
import type { Event } from '../types/event';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let events: Event[] = [];

// Create an event
router.post('/', (req, res) => {
    
  const { title, description, location, date, maxParticipants,currentParticipants } = req.body;
  if (!title || !date || !location || !maxParticipants || !currentParticipants) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newEvent: Event = {
    id: uuidv4(),
    title,
    description: description || '',
    location,
    date,
    maxParticipants: Number(maxParticipants),
    currentParticipants: Number(currentParticipants),
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// List all events (optional location filter)
router.get('/', (req, res) => {
  const { location } = req.query;
  if (location) {
    return res.json(events.filter(e => e.location.toLowerCase().includes((location as string).toLowerCase())));
  }
  res.json(events);
});

// Get event details
router.get('/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
});

export default router;