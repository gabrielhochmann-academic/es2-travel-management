package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.Employee;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "trip_cost_history")
public class TripCostHistory {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "responsible_employee_id", nullable = false)
    private Employee responsible;

    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal transportCost;
    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal lodgingCost;
    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal taxiCost;
    @Column(nullable = false) private OffsetDateTime changedAt;

    protected TripCostHistory() {
    }

    public TripCostHistory(Trip trip, Employee responsible, BigDecimal transportCost,
                           BigDecimal lodgingCost, BigDecimal taxiCost) {
        this.trip = trip;
        this.responsible = responsible;
        this.transportCost = transportCost;
        this.lodgingCost = lodgingCost;
        this.taxiCost = taxiCost;
        this.changedAt = OffsetDateTime.now();
    }

    public UUID getId() { return id; }
    public Trip getTrip() { return trip; }
    public Employee getResponsible() { return responsible; }
    public BigDecimal getTransportCost() { return transportCost; }
    public BigDecimal getLodgingCost() { return lodgingCost; }
    public BigDecimal getTaxiCost() { return taxiCost; }
    public OffsetDateTime getChangedAt() { return changedAt; }
}
