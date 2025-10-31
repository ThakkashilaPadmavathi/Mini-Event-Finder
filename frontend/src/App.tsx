import React, { useState } from 'react';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import EventForm from './components/EventForm';
import { Event } from './types/event';
import './App.css';
function App() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="app-container">
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
        <h1>Mini Event Finder</h1>
        <EventForm onEventCreated={event => setSelectedEvent(event)} />
        {!selectedEvent ? (
          <EventList onSelect={setSelectedEvent} />
        ) : (
          <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        )}
      </div>
    </div>
  );
}

export default App;