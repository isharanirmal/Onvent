import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Onvent</h1>
        <p className="hero-subtitle">Your complete event management solution</p>
        <p>Plan, organize, and manage events with ease</p>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>User Management</h3>
          <p>Register and manage users with secure authentication</p>
        </div>
        <div className="feature-card">
          <h3>Event Management</h3>
          <p>Create and browse events with detailed information</p>
        </div>
        <div className="feature-card">
          <h3>Ticket Booking</h3>
          <p>Book and manage tickets for your favorite events</p>
        </div>
      </div>
    </div>
  );
};

export default Home;