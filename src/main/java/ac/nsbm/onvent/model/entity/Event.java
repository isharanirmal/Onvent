package ac.nsbm.onvent.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private String location;
    
    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;
    
    @Column(nullable = false)
    private Double price;
    
    @Column(name = "max_attendees", nullable = false)
    private Integer maxAttendees;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;
    
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Ticket> tickets = new ArrayList<>();
    
    // Default constructor
    public Event() {}
    
    // Constructor with fields
    public Event(String title, String description, String location, LocalDateTime eventDate, Double price, Integer maxAttendees, User organizer) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.eventDate = eventDate;
        this.price = price;
        this.maxAttendees = maxAttendees;
        this.organizer = organizer;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public LocalDateTime getEventDate() {
        return eventDate;
    }
    
    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public Integer getMaxAttendees() {
        return maxAttendees;
    }
    
    public void setMaxAttendees(Integer maxAttendees) {
        this.maxAttendees = maxAttendees;
    }
    
    public User getOrganizer() {
        return organizer;
    }
    
    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }
    
    public List<Ticket> getTickets() {
        return tickets;
    }
    
    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
    
    // Helper methods for bidirectional relationships
    public void addTicket(Ticket ticket) {
        tickets.add(ticket);
        ticket.setEvent(this);
    }
    
    public void removeTicket(Ticket ticket) {
        tickets.remove(ticket);
        ticket.setEvent(null);
    }
}