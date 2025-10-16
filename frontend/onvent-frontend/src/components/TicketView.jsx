import React, { useState, useEffect } from 'react';
import ticketService from '../services/ticketService';

const TicketView = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getAllTickets();
      setTickets(response.data);
      setError('');
    } catch (err) {
      setError('Error loading tickets: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await ticketService.deleteTicket(id);
        loadTickets(); // Refresh the list
      } catch (err) {
        setError('Error deleting ticket: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  if (loading) return <div className="message">Loading tickets...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ticket-list">
      <h2>Tickets</h2>
      <div className="form-actions">
        <button onClick={loadTickets}>Refresh Tickets</button>
      </div>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="table-container">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ticket Code</th>
                <th>Purchase Date</th>
                <th>User ID</th>
                <th>Event ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.ticketCode}</td>
                  <td>{new Date(ticket.purchaseDate).toLocaleString()}</td>
                  <td>{ticket.user?.id || 'N/A'}</td>
                  <td>{ticket.event?.id || 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(ticket.id)}
                      className="btn-secondary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketView;