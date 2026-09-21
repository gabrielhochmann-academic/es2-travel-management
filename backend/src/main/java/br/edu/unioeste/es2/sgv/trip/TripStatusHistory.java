package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.Employee;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "trip_status_history")
public class TripStatusHistory {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TripStatus status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "responsible_employee_id", nullable = false)
    private Employee responsible;

    @Column(length = 500)
    private String justification;

    @Column(nullable = false)
    private OffsetDateTime changedAt;

    protected TripStatusHistory() {
    }

    public TripStatusHistory(Trip trip, TripStatus status, Employee responsible, String justification) {
        this.trip = trip;
        this.status = status;
        this.responsible = responsible;
        this.justification = justification;
        this.changedAt = OffsetDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public TripStatus getStatus() {
        return status;
    }

    public Employee getResponsible() {
        return responsible;
    }

    public String getJustification() {
        return justification;
    }

    public OffsetDateTime getChangedAt() {
        return changedAt;
    }
}
