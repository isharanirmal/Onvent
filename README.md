# Onvent - Event Management System

This is a Spring Boot application for managing events, users, and tickets.

## Prerequisites

- Java 21 or higher
- Maven
- PostgreSQL database

## Setup

1. Configure database connection in `src/main/resources/application.properties`
2. Update the database URL, username, and password as needed

## Running the Application

### Using Maven Wrapper

```bash
./mvnw spring-boot:run
```

Or on Windows:
```bash
mvnw.cmd spring-boot:run
```

### Using Java directly

1. Package the application:
   ```bash
   ./mvnw package
   ```

2. Run the JAR file:
   ```bash
   java -jar target/Onvent-0.0.1-SNAPSHOT.jar
   ```

## API Endpoints

### Users
- `POST /users/create` - Create a new user
- `GET /users/all` - Get all users
- `GET /users/{id}` - Get user by ID
- `PUT /users/update/{id}` - Update user by ID
- `DELETE /users/delete/{id}` - Delete user by ID

### Events
- `POST /events/create` - Create a new event
- `GET /events/all` - Get all events
- `GET /events/{id}` - Get event by ID
- `PUT /events/update/{id}` - Update event by ID
- `DELETE /events/delete/{id}` - Delete event by ID

### Tickets
- `POST /tickets/create` - Create a new ticket
- `GET /tickets/all` - Get all tickets
- `GET /tickets/{id}` - Get ticket by ID
- `PUT /tickets/update/{id}` - Update ticket by ID
- `DELETE /tickets/delete/{id}` - Delete ticket by ID

## Frontend

A React frontend is available in the `frontend/onvent-frontend` directory.

To run the frontend:
1. Navigate to the frontend directory: `cd frontend/onvent-frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

The frontend will be available at `http://localhost:5174` (or another port if 5173 is in use).