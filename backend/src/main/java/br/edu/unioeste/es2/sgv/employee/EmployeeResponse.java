package br.edu.unioeste.es2.sgv.employee;

import java.util.UUID;

public record EmployeeResponse(
        UUID id,
        String registrationNumber,
        String name,
        AreaResponse area,
        CargoResponse cargo,
        EmployeeRole role) {
    static EmployeeResponse from(Employee employee) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getRegistrationNumber(),
                employee.getName(),
                AreaResponse.from(employee.getCurrentArea()),
                CargoResponse.from(employee.getCurrentCargo()),
                employee.getCurrentRole());
    }
}
