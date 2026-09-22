package br.edu.unioeste.es2.sgv.employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 6)
    private String registrationNumber;

    @Column(nullable = false, length = 150)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "area_id", nullable = false)
    private Area currentArea;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cargo_id", nullable = false)
    private Cargo currentCargo;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    protected Employee() {
    }

    public Employee(String registrationNumber, String name, Area currentArea, Cargo currentCargo) {
        this.registrationNumber = registrationNumber;
        this.name = name;
        this.currentArea = currentArea;
        this.currentCargo = currentCargo;
        this.createdAt = OffsetDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public String getName() {
        return name;
    }

    public Area getCurrentArea() {
        return currentArea;
    }

    public Cargo getCurrentCargo() {
        return currentCargo;
    }

    public EmployeeRole getCurrentRole() {
        return currentCargo.getRole();
    }

    public void changeAssignment(Area area, Cargo cargo) {
        this.currentArea = area;
        this.currentCargo = cargo;
    }
}
