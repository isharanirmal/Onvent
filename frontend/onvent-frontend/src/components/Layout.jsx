import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">Onvent</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/users">User List</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/tickets/book">Book Tickets</Link></li>
          <li><Link to="/dashboard">My Bookings</Link></li>
          <li><Link to="/tickets">All Tickets</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/test">API Test</Link></li>
          <li><Link to="/crud-test">CRUD Test</Link></li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;