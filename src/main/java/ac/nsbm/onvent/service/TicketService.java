package ac.nsbm.onvent.service;

import ac.nsbm.onvent.model.entity.Ticket;
import ac.nsbm.onvent.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> getTicketById(Long id) {
        return ticketRepository.findById(id);
    }

    public Ticket updateTicket(Long id, Ticket ticketDetails) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setPurchaseDate(ticketDetails.getPurchaseDate());
        ticket.setTicketCode(ticketDetails.getTicketCode());
        ticket.setUser(ticketDetails.getUser());
        ticket.setEvent(ticketDetails.getEvent());

        return ticketRepository.save(ticket);
    }

    public void deleteTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        ticketRepository.delete(ticket);
    }
}