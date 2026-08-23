package br.edu.unioeste.es2.sgv.trip;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "trips")
public class Trip {
    @Id @GeneratedValue private UUID id;
    @Column(nullable = false) private String destination;
    @Column(nullable = false) private LocalDate departureDate;
    @Column(nullable = false) private LocalDate returnDate;
    @Column(nullable = false, length = 500) private String reason;
    @Column(nullable = false) private String transportMode;
    @Column(nullable = false) private String responsibleName;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private TripStatus status;
    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal estimatedCost = BigDecimal.ZERO;
    @Column(nullable = false) private OffsetDateTime createdAt;
    protected Trip() { }
    public Trip(String destination, LocalDate departureDate, LocalDate returnDate, String reason, String transportMode, String responsibleName) {
        this.destination = destination; this.departureDate = departureDate; this.returnDate = returnDate; this.reason = reason;
        this.transportMode = transportMode; this.responsibleName = responsibleName; this.status = TripStatus.RASCUNHO; this.createdAt = OffsetDateTime.now();
    }
    public UUID getId() { return id; } public String getDestination() { return destination; } public LocalDate getDepartureDate() { return departureDate; }
    public LocalDate getReturnDate() { return returnDate; } public String getReason() { return reason; } public String getTransportMode() { return transportMode; }
    public String getResponsibleName() { return responsibleName; } public TripStatus getStatus() { return status; } public BigDecimal getEstimatedCost() { return estimatedCost; }
    public void updateStatus(TripStatus status) { this.status = status; }
}
