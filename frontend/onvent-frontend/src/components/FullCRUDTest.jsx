import React, { useState } from 'react';
import userService from '../services/userService';
import eventService from '../services/eventService';
import ticketService from '../services/ticketService';

const FullCRUDTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (testName, status, details = '') => {
    setTestResults(prev => [...prev, { testName, status, details, timestamp: new Date().toLocaleTimeString() }]);
  };

  const runFullCRUDTest = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      // Test 1: Create User
      addResult('Create User', 'Running', 'Creating a new user...');
      const userResponse = await userService.createUser({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      });
      const userId = userResponse.data.id;
      addResult('Create User', 'Success', `Created user with ID: ${userId}`);

      // Test 2: Get User
      addResult('Get User', 'Running', `Fetching user with ID: ${userId}...`);
      const getUserResponse = await userService.getUserById(userId);
      addResult('Get User', 'Success', `Retrieved user: ${getUserResponse.data.name}`);

      // Test 3: Create Event
      addResult('Create Event', 'Running', 'Creating a new event...');
      const eventResponse = await eventService.createEvent({
        title: 'Test Event',
        description: 'This is a test event',
        location: 'Test Location',
        eventDate: new Date().toISOString(),
        price: 25.99,
        maxAttendees: 100,
        organizer: { id: userId }
      });
      const eventId = eventResponse.data.id;
      addResult('Create Event', 'Success', `Created event with ID: ${eventId}`);

      // Test 4: Get Event
      addResult('Get Event', 'Running', `Fetching event with ID: ${eventId}...`);
      const getEventResponse = await eventService.getEventById(eventId);
      addResult('Get Event', 'Success', `Retrieved event: ${getEventResponse.data.title}`);

      // Test 5: Create Ticket
      addResult('Create Ticket', 'Running', 'Creating a new ticket...');
      const ticketResponse = await ticketService.createTicket({
        purchaseDate: new Date().toISOString(),
        ticketCode: `TICKET-${Date.now()}`,
        user: { id: userId },
        event: { id: eventId }
      });
      const ticketId = ticketResponse.data.id;
      addResult('Create Ticket', 'Success', `Created ticket with ID: ${ticketId}`);

      // Test 6: Get Ticket
      addResult('Get Ticket', 'Running', `Fetching ticket with ID: ${ticketId}...`);
      const getTicketResponse = await ticketService.getTicketById(ticketId);
      addResult('Get Ticket', 'Success', `Retrieved ticket: ${getTicketResponse.data.ticketCode}`);

      // Test 7: Update User
      addResult('Update User', 'Running', `Updating user with ID: ${userId}...`);
      const updateUserResponse = await userService.updateUser(userId, {
        name: 'Updated Test User',
        email: `updated${Date.now()}@example.com`,
        password: 'newpassword123'
      });
      addResult('Update User', 'Success', `Updated user: ${updateUserResponse.data.name}`);

      // Test 8: Update Event
      addResult('Update Event', 'Running', `Updating event with ID: ${eventId}...`);
      const updateEventResponse = await eventService.updateEvent(eventId, {
        title: 'Updated Test Event',
        description: 'This is an updated test event',
        location: 'Updated Location',
        eventDate: new Date().toISOString(),
        price: 35.99,
        maxAttendees: 150,
        organizer: { id: userId }
      });
      addResult('Update Event', 'Success', `Updated event: ${updateEventResponse.data.title}`);

      // Test 9: Update Ticket
      addResult('Update Ticket', 'Running', `Updating ticket with ID: ${ticketId}...`);
      const updateTicketResponse = await ticketService.updateTicket(ticketId, {
        purchaseDate: new Date().toISOString(),
        ticketCode: `UPDATED-TICKET-${Date.now()}`,
        user: { id: userId },
        event: { id: eventId }
      });
      addResult('Update Ticket', 'Success', `Updated ticket: ${updateTicketResponse.data.ticketCode}`);

      // Test 10: Delete Ticket
      addResult('Delete Ticket', 'Running', `Deleting ticket with ID: ${ticketId}...`);
      await ticketService.deleteTicket(ticketId);
      addResult('Delete Ticket', 'Success', `Deleted ticket with ID: ${ticketId}`);

      // Test 11: Delete Event
      addResult('Delete Event', 'Running', `Deleting event with ID: ${eventId}...`);
      await eventService.deleteEvent(eventId);
      addResult('Delete Event', 'Success', `Deleted event with ID: ${eventId}`);

      // Test 12: Delete User
      addResult('Delete User', 'Running', `Deleting user with ID: ${userId}...`);
      await userService.deleteUser(userId);
      addResult('Delete User', 'Success', `Deleted user with ID: ${userId}`);

      addResult('Full CRUD Test', 'Completed', 'All tests passed successfully!');
    } catch (error) {
      addResult('Full CRUD Test', 'Error', `Test failed: ${error.message}`);
      console.error('CRUD Test Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="crud-test">
      <h2>Full CRUD Flow Test</h2>
      <button onClick={runFullCRUDTest} disabled={isLoading}>
        {isLoading ? 'Running Tests...' : 'Run Full CRUD Test'}
      </button>
      
      {testResults.length > 0 && (
        <div className="test-results">
          <h3>Test Results</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Test</th>
                <th>Status</th>
                <th>Details</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.testName}</td>
                  <td className={`status-${result.status.toLowerCase()}`}>
                    {result.status}
                  </td>
                  <td>{result.details}</td>
                  <td>{result.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FullCRUDTest;