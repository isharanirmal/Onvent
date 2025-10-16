package ac.nsbm.onvent.model.dto;

import java.time.LocalDateTime;

public class BookingResponse {
    private Long ticketId;
    private String ticketCode;
    private Long userId;
    private String userName;
    private Long eventId;
    private String eventTitle;
    private String eventLocation;
    private LocalDateTime eventDate;
    private Double eventPrice;
    private LocalDateTime purchaseDate;
    private String status;
    private Integer availableSeats;

    public BookingResponse() {}

    public BookingResponse(Long ticketId, String ticketCode, Long userId, String userName, 
                          Long eventId, String eventTitle, String eventLocation, 
                          LocalDateTime eventDate, Double eventPrice, LocalDateTime purchaseDate, 
                          String status, Integer availableSeats) {
        this.ticketId = ticketId;
        this.ticketCode = ticketCode;
        this.userId = userId;
        this.userName = userName;
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.eventLocation = eventLocation;
        this.eventDate = eventDate;
        this.eventPrice = eventPrice;
        this.purchaseDate = purchaseDate;
        this.status = status;
        this.availableSeats = availableSeats;
    }

    // Getters and Setters
    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public String getTicketCode() {
        return ticketCode;
    }

    public void setTicketCode(String ticketCode) {
        this.ticketCode = ticketCode;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public Double getEventPrice() {
        return eventPrice;
    }

    public void setEventPrice(Double eventPrice) {
        this.eventPrice = eventPrice;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }
}
