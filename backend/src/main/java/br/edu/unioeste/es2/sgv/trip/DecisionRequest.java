package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record DecisionRequest(
                @NotNull(message = "O status da decisão é obrigatório") TripStatus status,

                @NotNull(message = "O ID do gestor responsável é obrigatório") UUID managerId,

                String justification) {
}