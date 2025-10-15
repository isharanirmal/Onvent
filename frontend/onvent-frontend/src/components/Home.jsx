import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Onvent</h1>
      <p>Your event management system</p>
      <div className="features">
        <div className="feature-card">
          <h3>User Management</h3>
          <p>Register and manage users</p>
        </div>
        <div className="feature-card">
          <h3>Event Management</h3>
          <p>Create and browse events</p>
        </div>
        <div className="feature-card">
          <h3>Ticket Booking</h3>
          <p>Book and manage tickets</p>
        </div>
      </div>
    </div>
  );
};

export default Home;