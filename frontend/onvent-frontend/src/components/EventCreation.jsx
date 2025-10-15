import React, { useState } from 'react';
import eventService from '../services/eventService';

const EventCreation = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    location: '',
    eventDate: '',
    price: '',
    maxAttendees: '',
    organizer: { id: '' }
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'organizerId') {
      setEvent({
        ...event,
        organizer: { id: value }
      });
    } else if (name === 'price' || name === 'maxAttendees') {
      setEvent({
        ...event,
        [name]: parseFloat(value) || 0
      });
    } else {
      setEvent({
        ...event,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the event data
      const eventData = {
        ...event,
        price: parseFloat(event.price),
        maxAttendees: parseInt(event.maxAttendees)
      };
      
      const response = await eventService.createEvent(eventData);
      setMessage('Event created successfully!');
      setEvent({
        title: '',
        description: '',
        location: '',
        eventDate: '',
        price: '',
        maxAttendees: '',
        organizer: { id: '' }
      });
    } catch (error) {
      setMessage('Error creating event: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="event-form">
      <h2>Create Event</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="datetime-local"
            id="eventDate"
            name="eventDate"
            value={event.eventDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={event.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxAttendees">Max Attendees:</label>
          <input
            type="number"
            id="maxAttendees"
            name="maxAttendees"
            value={event.maxAttendees}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizerId">Organizer ID:</label>
          <input
            type="number"
            id="organizerId"
            name="organizerId"
            value={event.organizer.id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreation;