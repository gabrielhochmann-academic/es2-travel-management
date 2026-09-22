package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.util.UUID;

public record UpdateCostsRequest(
        @NotNull @PositiveOrZero BigDecimal transportCost,
        @NotNull @PositiveOrZero BigDecimal lodgingCost,
        @NotNull @PositiveOrZero BigDecimal taxiCost,
        @NotNull UUID employeeId) {
}
