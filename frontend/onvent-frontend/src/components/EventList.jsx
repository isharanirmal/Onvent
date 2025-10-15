import React, { useState, useEffect } from 'react';
import eventService from '../services/eventService';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getAllEvents();
      setEvents(response.data);
      setError('');
    } catch (err) {
      setError('Error loading events: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eventService.deleteEvent(id);
      loadEvents(); // Refresh the list
    } catch (err) {
      setError('Error deleting event: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="event-list">
      <h2>Events</h2>
      <button onClick={loadEvents}>Refresh Events</button>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Price</th>
              <th>Max Attendees</th>
              <th>Organizer ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.description.substring(0, 50)}...</td>
                <td>{event.location}</td>
                <td>{new Date(event.eventDate).toLocaleString()}</td>
                <td>${event.price}</td>
                <td>{event.maxAttendees}</td>
                <td>{event.organizer?.id || 'N/A'}</td>
                <td>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventList;