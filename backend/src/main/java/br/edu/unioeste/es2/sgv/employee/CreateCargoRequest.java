package br.edu.unioeste.es2.sgv.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCargoRequest(@NotBlank String name, @NotNull EmployeeRole role) {
}
