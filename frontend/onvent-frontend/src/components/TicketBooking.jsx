import React, { useState, useEffect } from 'react';
import ticketService from '../services/ticketService';
import eventService from '../services/eventService';

const TicketBooking = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [availability, setAvailability] = useState(null);
  const [userId, setUserId] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    loadEvents();
    // Load userId from localStorage if available
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const loadEvents = async () => {
    try {
      const response = await eventService.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      setMessage('Error loading events: ' + (error.response?.data?.error || error.message));
    }
  };

  const checkAvailability = async (eventId) => {
    if (!eventId) return;
    
    try {
      setCheckingAvailability(true);
      const response = await ticketService.checkAvailability(eventId);
      setAvailability(response.data);
    } catch (error) {
      setMessage('Error checking availability: ' + (error.response?.data?.error || error.message));
      setAvailability(null);
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEventId(eventId);
    if (eventId) {
      checkAvailability(eventId);
    } else {
      setAvailability(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!userId || !selectedEventId) {
      setMessage('Please fill in all required fields');
      return;
    }

    // Store userId for future use
    localStorage.setItem('userId', userId);

    try {
      setLoading(true);
      const bookingRequest = {
        userId: parseInt(userId),
        eventId: parseInt(selectedEventId),
        numberOfTickets: numberOfTickets
      };
      
      const response = await ticketService.bookTicket(bookingRequest);
      setMessage(`✅ Ticket booked successfully! Ticket Code: ${response.data.ticketCode}`);
      
      // Reset form
      setSelectedEventId('');
      setNumberOfTickets(1);
      setAvailability(null);
      
      // Refresh events to update availability
      loadEvents();
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      setMessage('❌ Error booking ticket: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getAvailabilityColor = () => {
    if (!availability) return '';
    if (availability.availableSeats === 0) return '#dc3545';
    if (availability.availableSeats < 10) return '#ffc107';
    return '#28a745';
  };

  return (
    <div className="ticket-booking-container">
      <h2>Book Event Tickets</h2>
      
      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="userId">User ID: *</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventId">Select Event: *</label>
          <select
            id="eventId"
            name="eventId"
            value={selectedEventId}
            onChange={handleEventChange}
            required
          >
            <option value="">-- Select an Event --</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title} - {formatDate(event.eventDate)} - ${event.price}
              </option>
            ))}
          </select>
        </div>

        {selectedEventId && (
          <div className="event-details">
            {checkingAvailability ? (
              <div className="loading-availability">Checking availability...</div>
            ) : availability ? (
              <div className="availability-info">
                <div className="availability-header">
                  <h3>{availability.eventTitle}</h3>
                </div>
                
                <div className="availability-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Capacity:</span>
                    <span className="stat-value">{availability.maxAttendees}</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Booked Seats:</span>
                    <span className="stat-value">{availability.bookedSeats}</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Available Seats:</span>
                    <span 
                      className="stat-value available-seats"
                      style={{ color: getAvailabilityColor() }}
                    >
                      {availability.availableSeats}
                    </span>
                  </div>
                </div>

                <div className="availability-status">
                  {availability.availableSeats === 0 ? (
                    <div className="status-badge sold-out">SOLD OUT</div>
                  ) : availability.availableSeats < 10 ? (
                    <div className="status-badge limited">LIMITED SEATS AVAILABLE</div>
                  ) : (
                    <div className="status-badge available">AVAILABLE</div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="numberOfTickets">Number of Tickets:</label>
          <input
            type="number"
            id="numberOfTickets"
            name="numberOfTickets"
            value={numberOfTickets}
            onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
            min="1"
            max={availability?.availableSeats || 1}
            disabled={!availability || availability.availableSeats === 0}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading || !availability || availability.availableSeats === 0}
        >
          {loading ? 'Booking...' : 'Book Ticket'}
        </button>
      </form>

      <style jsx>{`
        .ticket-booking-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 30px;
        }

        .ticket-booking-container h2 {
          color: #333;
          margin-bottom: 30px;
          text-align: center;
        }

        .message {
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .booking-form {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 600;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 5px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #007bff;
        }

        .form-group input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .event-details {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .loading-availability {
          text-align: center;
          color: #666;
          padding: 20px;
        }

        .availability-info {
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .availability-header h3 {
          margin: 0 0 20px 0;
          color: #333;
          font-size: 20px;
        }

        .availability-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          padding: 15px;
          background: white;
          border-radius: 6px;
          text-align: center;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .stat-value.available-seats {
          font-size: 28px;
        }

        .availability-status {
          text-align: center;
          margin-top: 15px;
        }

        .status-badge {
          display: inline-block;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 13px;
          letter-spacing: 1px;
        }

        .status-badge.available {
          background-color: #28a745;
          color: white;
        }

        .status-badge.limited {
          background-color: #ffc107;
          color: #333;
        }

        .status-badge.sold-out {
          background-color: #dc3545;
          color: white;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #0056b3;
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 600px) {
          .availability-stats {
            grid-template-columns: 1fr;
          }

          .ticket-booking-container {
            padding: 15px;
          }

          .booking-form {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default TicketBooking;