package br.edu.unioeste.es2.sgv.employee;

import jakarta.validation.constraints.NotBlank;

public record CreateAreaRequest(
        @NotBlank(message = "O nome da área não pode ser vazio") String name) {
}