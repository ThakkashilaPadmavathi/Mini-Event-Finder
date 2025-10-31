import React from 'react';
import { Event } from '../types/event';

const EventDetail: React.FC<{ event: Event; onBack: () => void }> = ({ event, onBack }) => (
  <div>
    <button onClick={onBack}>Back</button>
    <h2>{event.title}</h2>
    <p><b>Description:</b> {event.description}</p>
    <p><b>Location:</b> {event.location}</p>
    <p><b>Date:</b> {new Date(event.date).toLocaleString()}</p>
    <p><b>Participants:</b> {event.currentParticipants} / {event.maxParticipants}</p>
  </div>
);

export default EventDetail;