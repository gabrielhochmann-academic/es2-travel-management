package br.edu.unioeste.es2.sgv.employee;

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
@Table(name = "employment_history")
public class EmploymentHistory {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cargo_id", nullable = false)
    private Cargo cargo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EmployeeRole role;

    @Column(nullable = false)
    private OffsetDateTime validFrom;

    private OffsetDateTime validTo;

    protected EmploymentHistory() {
    }

    public EmploymentHistory(Employee employee, Area area, Cargo cargo) {
        this.employee = employee;
        this.area = area;
        this.cargo = cargo;
        this.role = cargo.getRole();
        this.validFrom = OffsetDateTime.now();
    }

    public UUID getId() { return id; }
    public Area getArea() { return area; }
    public Cargo getCargo() { return cargo; }
    public EmployeeRole getRole() { return role; }
    public OffsetDateTime getValidFrom() { return validFrom; }
    public OffsetDateTime getValidTo() { return validTo; }

    public void close() {
        this.validTo = OffsetDateTime.now();
    }
}
