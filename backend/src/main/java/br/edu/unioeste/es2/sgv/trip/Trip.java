package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.Employee;
import br.edu.unioeste.es2.sgv.employee.EmployeeRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "trips")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 20)
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false, length = 150)
    private String employeeName;
    @Column(nullable = false, length = 6)
    private String employeeRegistrationNumber;
    @Column(nullable = false, length = 100)
    private String employeeArea;
    @Column(nullable = false, length = 100)
    private String employeeCargo;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EmployeeRole employeeRole;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TripStatus status;
    @Column(length = 500)
    private String decisionJustification;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal transportCost = BigDecimal.ZERO;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal lodgingCost = BigDecimal.ZERO;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal taxiCost = BigDecimal.ZERO;
    @Column(nullable = false)
    private OffsetDateTime createdAt;

    protected Trip() {
    }

    public Trip(String tripNumber, String destination, LocalDate departureDate, LocalDate returnDate,
            String reason, String transportMode, Employee employee) {
        this.tripNumber = tripNumber;
        this.destination = destination;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.reason = reason;
        this.transportMode = transportMode;
        this.employee = employee;
        snapshotEmployeeAssignment();
        this.status = TripStatus.RASCUNHO;
        this.createdAt = OffsetDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public String getTripNumber() {
        return tripNumber;
    }

    public String getDestination() {
        return destination;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public String getReason() {
        return reason;
    }

    public String getTransportMode() {
        return transportMode;
    }

    public Employee getEmployee() {
        return employee;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public String getEmployeeRegistrationNumber() {
        return employeeRegistrationNumber;
    }

    public String getEmployeeArea() {
        return employeeArea;
    }

    public String getEmployeeCargo() {
        return employeeCargo;
    }

    public EmployeeRole getEmployeeRole() {
        return employeeRole;
    }

    public TripStatus getStatus() {
        return status;
    }

    public String getDecisionJustification() {
        return decisionJustification;
    }

    public BigDecimal getTransportCost() {
        return transportCost;
    }

    public BigDecimal getLodgingCost() {
        return lodgingCost;
    }

    public BigDecimal getTaxiCost() {
        return taxiCost;
    }

    public BigDecimal getTotalCost() {
        return transportCost.add(lodgingCost).add(taxiCost);
    }

    public void updateData(UpdateTripRequest request) {
        this.destination = request.destination();
        this.departureDate = request.departureDate();
        this.returnDate = request.returnDate();
        this.reason = request.reason();
        this.transportMode = request.transportMode();
    }

    public void transitionTo(TripStatus status, String justification) {
        this.status = status;
        this.decisionJustification = justification;
    }

    public void snapshotEmployeeAssignment() {
        this.employeeName = employee.getName();
        this.employeeRegistrationNumber = employee.getRegistrationNumber();
        this.employeeArea = employee.getCurrentArea().getName();
        this.employeeCargo = employee.getCurrentCargo().getName();
        this.employeeRole = employee.getCurrentRole();
    }

    public void defineCosts(BigDecimal transportCost, BigDecimal lodgingCost, BigDecimal taxiCost) {
        this.transportCost = transportCost;
        this.lodgingCost = lodgingCost;
        this.taxiCost = taxiCost;
    }
}
