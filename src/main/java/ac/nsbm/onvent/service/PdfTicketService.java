package ac.nsbm.onvent.service;

import ac.nsbm.onvent.model.entity.Ticket;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.io.font.constants.StandardFonts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
@Slf4j
public class PdfTicketService {

    public byte[] generateTicketPdf(Ticket ticket) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);

            // Create fonts
            PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
            PdfFont normalFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            PdfFont italicFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_OBLIQUE);

            // Title
            document.add(new Paragraph("EVENT TICKET")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(20)
                    .setFontColor(ColorConstants.BLUE)
                    .setFont(boldFont));

            document.add(new Paragraph(" ")
                    .setMarginBottom(20));

            // Ticket information table
            float[] columnWidths = {1, 2};
            Table table = new Table(UnitValue.createPercentArray(columnWidths));
            table.setWidth(UnitValue.createPercentValue(100));

            // Add ticket details
            table.addHeaderCell(createHeaderCell("Field", boldFont));
            table.addHeaderCell(createHeaderCell("Details", boldFont));

            table.addCell(createCell("Ticket ID", normalFont));
            table.addCell(createCell(ticket.getId().toString(), normalFont));

            table.addCell(createCell("Event Name", normalFont));
            table.addCell(createCell(ticket.getEvent().getTitle(), normalFont));

            table.addCell(createCell("Event Date", normalFont));
            table.addCell(createCell(ticket.getEvent().getEventDate().toString(), normalFont));

            table.addCell(createCell("Attendee Name", normalFont));
            table.addCell(createCell(ticket.getUser().getName(), normalFont));

            table.addCell(createCell("Booking Date", normalFont));
            table.addCell(createCell(ticket.getPurchaseDate().toString(), normalFont));

            table.addCell(createCell("Number of Seats", normalFont));
            table.addCell(createCell("1", normalFont));

            table.addCell(createCell("Total Price", normalFont));
            table.addCell(createCell("$" + ticket.getEvent().getPrice(), normalFont));

            document.add(table);

            // Footer note
            document.add(new Paragraph(" ")
                    .setMarginTop(20));

            document.add(new Paragraph("Thank you for booking with Onvent!")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFont(italicFont));

            document.close();

            log.info("PDF ticket generated successfully for ticket ID: {}", ticket.getId());
            return baos.toByteArray();
        } catch (Exception e) {
            log.error("Failed to generate PDF ticket for ticket ID: {}", ticket.getId(), e);
            throw new RuntimeException("Failed to generate PDF ticket", e);
        }
    }

    private Cell createHeaderCell(String content, PdfFont font) {
        Cell cell = new Cell()
                .add(new Paragraph(content).setFont(font))
                .setBackgroundColor(ColorConstants.LIGHT_GRAY);
        return cell;
    }

    private Cell createCell(String content, PdfFont font) {
        return new Cell().add(new Paragraph(content).setFont(font));
    }
}