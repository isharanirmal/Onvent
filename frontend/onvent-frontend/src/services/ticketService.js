import api from './api';

class TicketService {
  // Create a new ticket
  createTicket(ticket) {
    return api.post('/tickets/create', ticket);
  }

  // Get all tickets
  getAllTickets() {
    return api.get('/tickets/all');
  }

  // Get ticket by ID
  getTicketById(id) {
    return api.get(`/tickets/${id}`);
  }

  // Update ticket by ID
  updateTicket(id, ticket) {
    return api.put(`/tickets/update/${id}`, ticket);
  }

  // Delete ticket by ID
  deleteTicket(id) {
    return api.delete(`/tickets/delete/${id}`);
  }
}

export default new TicketService();