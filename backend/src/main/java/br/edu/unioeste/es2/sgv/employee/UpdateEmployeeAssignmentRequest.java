package br.edu.unioeste.es2.sgv.employee;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record UpdateEmployeeAssignmentRequest(@NotNull UUID areaId, @NotNull UUID cargoId) {
}
