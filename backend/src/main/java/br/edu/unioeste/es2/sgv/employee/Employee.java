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
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true, length = 6)
    private String registrationNumber;

    @Column(nullable = false, length = 150)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "area_id", nullable = false)
    private Area currentArea;

    @Enumerated(EnumType.STRING)
    @Column(name = "employee_role", nullable = false, length = 20)
    private EmployeeRole currentRole;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    protected Employee() {
    }

    public Employee(String registrationNumber, String name, Area currentArea, EmployeeRole currentRole) {
        this.registrationNumber = registrationNumber;
        this.name = name;
        this.currentArea = currentArea;
        this.currentRole = currentRole;
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

    public EmployeeRole getCurrentRole() {
        return currentRole;
    }

    public void changeAssignment(Area area, EmployeeRole role) {
        this.currentArea = area;
        this.currentRole = role;
    }
}
