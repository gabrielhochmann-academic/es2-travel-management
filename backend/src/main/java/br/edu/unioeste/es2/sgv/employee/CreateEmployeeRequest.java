package br.edu.unioeste.es2.sgv.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record CreateEmployeeRequest(
        @NotBlank @Pattern(regexp = "\\d{4}-\\d", message = "A matrícula deve seguir o formato XXXX-X.") String registrationNumber,
        @NotBlank String name,
        @NotNull UUID areaId,
        @NotNull EmployeeRole role) {
}
