package ac.nsbm.onvent.model.dto;

public class AvailabilityResponse {
    private Long eventId;
    private String eventTitle;
    private Integer maxAttendees;
    private Integer bookedSeats;
    private Integer availableSeats;
    private boolean isAvailable;

    public AvailabilityResponse() {}

    public AvailabilityResponse(Long eventId, String eventTitle, Integer maxAttendees, 
                               Integer bookedSeats, Integer availableSeats, boolean isAvailable) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.maxAttendees = maxAttendees;
        this.bookedSeats = bookedSeats;
        this.availableSeats = availableSeats;
        this.isAvailable = isAvailable;
    }

    // Getters and Setters
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

    public Integer getMaxAttendees() {
        return maxAttendees;
    }

    public void setMaxAttendees(Integer maxAttendees) {
        this.maxAttendees = maxAttendees;
    }

    public Integer getBookedSeats() {
        return bookedSeats;
    }

    public void setBookedSeats(Integer bookedSeats) {
        this.bookedSeats = bookedSeats;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
