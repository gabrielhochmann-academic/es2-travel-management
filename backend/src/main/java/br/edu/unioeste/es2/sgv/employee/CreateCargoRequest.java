package br.edu.unioeste.es2.sgv.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCargoRequest(
        @NotBlank(message = "O nome do cargo é obrigatório.") String name,

        @NotNull(message = "O perfil/papel do cargo é obrigatório.") EmployeeRole role) {
}