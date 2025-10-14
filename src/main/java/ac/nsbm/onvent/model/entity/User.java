package ac.nsbm.onvent.model.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @OneToMany(mappedBy = "organizer", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Event> events = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Ticket> tickets = new ArrayList<>();
    
    // Default constructor
    public User() {}
    
    // Constructor with fields
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public List<Event> getEvents() {
        return events;
    }
    
    public void setEvents(List<Event> events) {
        this.events = events;
    }
    
    public List<Ticket> getTickets() {
        return tickets;
    }
    
    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
    
    // Helper methods for bidirectional relationships
    public void addEvent(Event event) {
        events.add(event);
        event.setOrganizer(this);
    }
    
    public void removeEvent(Event event) {
        events.remove(event);
        event.setOrganizer(null);
    }
    
    public void addTicket(Ticket ticket) {
        tickets.add(ticket);
        ticket.setUser(this);
    }
    
    public void removeTicket(Ticket ticket) {
        tickets.remove(ticket);
        ticket.setUser(null);
    }
}