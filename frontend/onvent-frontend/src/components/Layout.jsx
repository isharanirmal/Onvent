import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">
          <NavLink to="/">Onvent</NavLink>
        </div>
        <ul className="nav-links">
          <li><NavLink to="/users">User List</NavLink></li>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/tickets">Tickets</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/test">API Test</NavLink></li>
          <li><NavLink to="/crud-test">CRUD Test</NavLink></li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;