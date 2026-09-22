package br.edu.unioeste.es2.sgv.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record CreateEmployeeRequest(
                @NotBlank(message = "A matrícula é obrigatória") @Pattern(regexp = "\\d{4}-\\d", message = "A matrícula deve seguir o formato XXXX-X.") String registrationNumber,

                @NotBlank(message = "O nome é obrigatório") String name,

                @NotNull(message = "A área é obrigatória") UUID areaId,

                @NotNull(message = "O cargo é obrigatório") UUID cargoId) {
}