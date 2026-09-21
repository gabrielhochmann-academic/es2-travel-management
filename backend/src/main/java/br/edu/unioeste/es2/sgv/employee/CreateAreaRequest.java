package br.edu.unioeste.es2.sgv.employee;

import jakarta.validation.constraints.NotBlank;

public record CreateAreaRequest(@NotBlank String name) {
}
