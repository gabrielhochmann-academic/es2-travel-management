package br.edu.unioeste.es2.sgv.employee;

import java.util.UUID;

public record EmployeeResponse(UUID id, String registrationNumber, String name, String area) {
    public static EmployeeResponse from(Employee employee) {
        return new EmployeeResponse(employee.getId(), employee.getRegistrationNumber(), employee.getName(), employee.getArea());
    }
}
