import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';
import { Event } from '../types/event';

const EventList: React.FC<{ onSelect: (e: Event) => void }> = ({ onSelect }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const loadEvents = async () => {
    setLoading(true);
    setError('');
    try {
      setEvents(await fetchEvents(location));
    } catch (e) {
      setError('Failed to load events');
    }
    setLoading(false);
  };

  useEffect(() => { loadEvents(); }, [location]);

  return (
    <div>
      <input
        placeholder="Filter by location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul className="event-list">
        {events.map(ev => (
          <li key={ev.id} style={{marginBottom: 10, cursor: 'pointer'}} onClick={() => onSelect(ev)}>
            <b>{ev.title}</b> – {ev.location} ({new Date(ev.date).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;