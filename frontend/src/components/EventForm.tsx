import React, { useState } from 'react';
import { createEvent } from '../api';
import { Event } from '../types/event';

const EventForm: React.FC<{ onEventCreated: (e: Event) => void }> = ({ onEventCreated }) => {
  const [form, setForm] = useState({ title: '', description: '', location: '', date: '', maxParticipants: 1, currentParticipants : 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const newEvent = await createEvent({ ...form, maxParticipants: Number(form.maxParticipants),currentParticipants: Number(form.currentParticipants) });
      setSuccess('Event created!');
      onEventCreated(newEvent);
      setForm({ title: '', description: '', location: '', date: '', maxParticipants: 1,currentParticipants : 1 });
    } catch {
      setError('Failed to create event');
    }
    setLoading(false);
  };

  return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input id="location" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date & Time</label>
                <input id="date" name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="maxParticipants">Max Participants</label>
                <input id="maxParticipants" name="maxParticipants" type="number" min={1} value={form.maxParticipants} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="currentParticipants">Current Participants</label>
                <input id="currentParticipants" name="currentParticipants" type="number" min={1} value={form.currentParticipants} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>Create Event</button>
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            {success && <p className="success" style={{ color: 'green' }}>{success}</p>}
        </form>
    // <form onSubmit={handleSubmit} style={{marginBottom: 16}}>
    //   <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
    //   <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
    //   <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
    //   <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
    //   <input name="maxParticipants" type="number" min={1} value={form.maxParticipants} onChange={handleChange} required />
    //   <input name="currentParticipants" type="number" min={1} value={form.currentParticipants} onChange={handleChange} required />
    //   <button type="submit" disabled={loading}>Create Event</button>
    //   {error && <p className="error" style={{color:'red'}}>{error}</p>}
    //   {success && <p className="success" style={{color:'green'}}>{success}</p>}
    // </form>
  );
};

export default EventForm;