CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    max_attendees INTEGER NOT NULL,
    price FLOAT NOT NULL,
    organizer_id BIGINT,
    CONSTRAINT fk_events_organizer FOREIGN KEY (organizer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tickets (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    purchase_date TIMESTAMP NOT NULL,
    quantity INTEGER NOT NULL,
    total_price FLOAT NOT NULL,
    CONSTRAINT fk_tickets_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_tickets_event FOREIGN KEY (event_id) REFERENCES events(id)
);