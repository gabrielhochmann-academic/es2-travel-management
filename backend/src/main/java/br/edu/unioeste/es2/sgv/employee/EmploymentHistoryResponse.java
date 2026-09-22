package br.edu.unioeste.es2.sgv.employee;

import java.time.OffsetDateTime;
import java.util.UUID;

public record EmploymentHistoryResponse(
        UUID id,
        AreaResponse area,
        CargoResponse cargo,
        EmployeeRole role,
        OffsetDateTime validFrom,
        OffsetDateTime validTo) {
    static EmploymentHistoryResponse from(EmploymentHistory history) {
        CargoResponse cargo = CargoResponse.from(history.getCargo());
        return new EmploymentHistoryResponse(
                history.getId(),
                AreaResponse.from(history.getArea()),
                cargo,
                cargo.role(),
                history.getValidFrom(),
                history.getValidTo());
    }
}
