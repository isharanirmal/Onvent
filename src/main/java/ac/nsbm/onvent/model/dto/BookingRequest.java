package ac.nsbm.onvent.model.dto;

public class BookingRequest {
    private Long userId;
    private Long eventId;
    private Integer numberOfTickets;

    public BookingRequest() {}

    public BookingRequest(Long userId, Long eventId, Integer numberOfTickets) {
        this.userId = userId;
        this.eventId = eventId;
        this.numberOfTickets = numberOfTickets;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Integer getNumberOfTickets() {
        return numberOfTickets;
    }

    public void setNumberOfTickets(Integer numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }
}
