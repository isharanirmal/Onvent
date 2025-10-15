import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import eventService from '../services/eventService';
import ticketService from '../services/ticketService';

const ApiTest = () => {
  const [testResults, setTestResults] = useState({
    users: { status: 'pending', data: null, error: null },
    events: { status: 'pending', data: null, error: null },
    tickets: { status: 'pending', data: null, error: null }
  });

  useEffect(() => {
    // Test all APIs
    testApis();
  }, []);

  const testApis = async () => {
    // Test Users API
    try {
      const userResponse = await userService.getAllUsers();
      setTestResults(prev => ({
        ...prev,
        users: { status: 'success', data: userResponse.data, error: null }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        users: { status: 'error', data: null, error: error.message }
      }));
    }

    // Test Events API
    try {
      const eventResponse = await eventService.getAllEvents();
      setTestResults(prev => ({
        ...prev,
        events: { status: 'success', data: eventResponse.data, error: null }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        events: { status: 'error', data: null, error: error.message }
      }));
    }

    // Test Tickets API
    try {
      const ticketResponse = await ticketService.getAllTickets();
      setTestResults(prev => ({
        ...prev,
        tickets: { status: 'success', data: ticketResponse.data, error: null }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        tickets: { status: 'error', data: null, error: error.message }
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'green';
      case 'error': return 'red';
      case 'pending': return 'orange';
      default: return 'black';
    }
  };

  return (
    <div className="api-test">
      <h2>API Connection Test</h2>
      <button onClick={testApis}>Test APIs Again</button>
      
      <div className="test-results">
        <h3>Users API</h3>
        <p>Status: <span style={{ color: getStatusColor(testResults.users.status) }}>
          {testResults.users.status}
        </span></p>
        {testResults.users.error && (
          <p>Error: {testResults.users.error}</p>
        )}
        {testResults.users.data && (
          <p>Users count: {testResults.users.data.length}</p>
        )}

        <h3>Events API</h3>
        <p>Status: <span style={{ color: getStatusColor(testResults.events.status) }}>
          {testResults.events.status}
        </span></p>
        {testResults.events.error && (
          <p>Error: {testResults.events.error}</p>
        )}
        {testResults.events.data && (
          <p>Events count: {testResults.events.data.length}</p>
        )}

        <h3>Tickets API</h3>
        <p>Status: <span style={{ color: getStatusColor(testResults.tickets.status) }}>
          {testResults.tickets.status}
        </span></p>
        {testResults.tickets.error && (
          <p>Error: {testResults.tickets.error}</p>
        )}
        {testResults.tickets.data && (
          <p>Tickets count: {testResults.tickets.data.length}</p>
        )}
      </div>
    </div>
  );
};

export default ApiTest;