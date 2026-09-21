package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record TripActionRequest(@NotNull UUID employeeId) {
}
