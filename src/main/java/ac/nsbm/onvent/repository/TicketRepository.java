package ac.nsbm.onvent.repository;

import ac.nsbm.onvent.model.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUserId(Long userId);
    List<Ticket> findByEventId(Long eventId);
    
    // Find active tickets for a user
    @Query("SELECT t FROM Ticket t WHERE t.user.id = :userId AND t.status = 'ACTIVE'")
    List<Ticket> findActiveTicketsByUserId(@Param("userId") Long userId);
    
    // Count active tickets for an event
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.event.id = :eventId AND t.status = 'ACTIVE'")
    Long countActiveTicketsByEventId(@Param("eventId") Long eventId);
    
    // Find active tickets by event ID
    @Query("SELECT t FROM Ticket t WHERE t.event.id = :eventId AND t.status = 'ACTIVE'")
    List<Ticket> findActiveTicketsByEventId(@Param("eventId") Long eventId);
    
    // Check if user already has an active ticket for an event
    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Ticket t WHERE t.user.id = :userId AND t.event.id = :eventId AND t.status = 'ACTIVE'")
    boolean existsActiveTicketByUserIdAndEventId(@Param("userId") Long userId, @Param("eventId") Long eventId);
}