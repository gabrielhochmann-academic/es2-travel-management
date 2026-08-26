package br.edu.unioeste.es2.sgv.employee;

import jakarta.validation.constraints.NotBlank;

public record CreateEmployeeRequest(
        @NotBlank String registrationNumber,
        @NotBlank String name,
        @NotBlank String area
) { }
