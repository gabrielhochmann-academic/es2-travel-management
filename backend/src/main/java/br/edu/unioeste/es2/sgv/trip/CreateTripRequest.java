package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record CreateTripRequest(@NotBlank String destination, @NotNull LocalDate departureDate, @NotNull LocalDate returnDate, @NotBlank String reason, @NotBlank String transportMode, @NotBlank String responsibleName) { }
