package br.edu.unioeste.es2.sgv.employee;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true, length = 40)
    private String registrationNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    protected Employee() { }

    public Employee(String registrationNumber, String name, String area) {
        this.registrationNumber = registrationNumber;
        this.name = name;
        this.area = area;
        this.createdAt = OffsetDateTime.now();
    }

    public UUID getId() { return id; }
    public String getRegistrationNumber() { return registrationNumber; }
    public String getName() { return name; }
    public String getArea() { return area; }
}
