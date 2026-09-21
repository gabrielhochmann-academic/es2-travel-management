package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateTripRequest(
        @NotNull UUID employeeId,
        @NotBlank String destination,
        @NotNull LocalDate departureDate,
        @NotNull LocalDate returnDate,
        @NotBlank String reason,
        @NotBlank String transportMode) {
}
