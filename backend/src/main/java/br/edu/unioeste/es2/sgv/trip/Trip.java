package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.Employee;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "trips")
public class Trip {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true, length = 40)
    private String tripNumber;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private LocalDate departureDate;

    @Column(nullable = false)
    private LocalDate returnDate;

    @Column(nullable = false, length = 500)
    private String reason;

    @Column(nullable = false)
    private String transportMode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TripStatus status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(length = 500)
    private String decisionJustification;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    protected Trip() { }

    public Trip(String tripNumber, String destination, LocalDate departureDate, LocalDate returnDate, String reason, String transportMode, Employee employee) {
        this.tripNumber = tripNumber;
        this.destination = destination;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.reason = reason;
        this.transportMode = transportMode;
        this.employee = employee;
        this.status = TripStatus.RASCUNHO;
        this.createdAt = OffsetDateTime.now();
    }

    public UUID getId() { return id; }
    public String getTripNumber() { return tripNumber; }
    public String getDestination() { return destination; }
    public LocalDate getDepartureDate() { return departureDate; }
    public LocalDate getReturnDate() { return returnDate; }
    public String getReason() { return reason; }
    public String getTransportMode() { return transportMode; }
    public TripStatus getStatus() { return status; }
    public Employee getEmployee() { return employee; }
    public String getDecisionJustification() { return decisionJustification; }

    public void submit() {
        this.status = TripStatus.SOLICITADA;
        this.decisionJustification = null;
    }

    public void decide(TripStatus status, String justification) {
        this.status = status;
        this.decisionJustification = justification;
    }
}
