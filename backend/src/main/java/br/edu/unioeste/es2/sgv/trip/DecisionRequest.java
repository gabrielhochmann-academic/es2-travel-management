package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record DecisionRequest(
        @NotNull TripStatus status,
        @NotNull UUID managerId,
        String justification) {
}
