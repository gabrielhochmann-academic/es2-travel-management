package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record CreateTripRequest(
                @NotBlank(message = "O destino é obrigatório") String destination,

                @NotNull(message = "A data de partida é obrigatória") LocalDate departureDate,

                @NotNull(message = "A data de retorno é obrigatória") LocalDate returnDate,

                @NotBlank(message = "O motivo da viagem é obrigatório") String reason,

                @NotBlank(message = "O meio de transporte é obrigatório") String transportMode,

                @NotNull(message = "O ID do funcionário é obrigatório") UUID employeeId) {
}