import api from './api';

class EventService {
  // Create a new event
  createEvent(event) {
    return api.post('/events/create', event);
  }

  // Get all events
  getAllEvents() {
    return api.get('/events/all');
  }

  // Get event by ID
  getEventById(id) {
    return api.get(`/events/${id}`);
  }

  // Update event by ID
  updateEvent(id, event) {
    return api.put(`/events/update/${id}`, event);
  }

  // Delete event by ID
  deleteEvent(id) {
    return api.delete(`/events/delete/${id}`);
  }
}

export default new EventService();