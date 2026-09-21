package br.edu.unioeste.es2.sgv.employee;

import java.util.UUID;

public record CargoResponse(UUID id, String name, EmployeeRole role) {
    static CargoResponse from(Cargo cargo) {
        return new CargoResponse(cargo.getId(), cargo.getName(), cargo.getRole());
    }
}
