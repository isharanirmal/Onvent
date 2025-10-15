# Onvent Frontend

This is the React frontend for the Onvent event management system.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5174`

## Backend Connection

The frontend connects to the Spring Boot backend running on `http://localhost:8085`.

Make sure the backend is running before using the frontend application.

## Features

- User Registration and Login
- Event Creation and Listing
- Ticket Booking and Viewing
- Full CRUD operations for all entities

## Available Routes

- `/` - Home page
- `/register` - User registration
- `/login` - User login
- `/events` - Event listing
- `/events/create` - Create new event
- `/tickets` - Ticket viewing
- `/tickets/book` - Book new ticket
- `/test` - API connection test

## Technologies Used

- React
- React Router
- Axios for API calls
- Vite for build tooling