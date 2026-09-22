package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record UpdateCostsRequest(
        @NotNull(message = "O custo de transporte é obrigatório")
        @PositiveOrZero(message = "O custo de transporte deve ser maior ou igual a zero")
        BigDecimal transportCost,

        @NotNull(message = "O custo de hospedagem é obrigatório")
        @PositiveOrZero(message = "O custo de hospedagem deve ser maior ou igual a zero")
        BigDecimal lodgingCost,

        @NotNull(message = "O custo de táxi/aplicativo é obrigatório")
        @PositiveOrZero(message = "O custo de táxi/aplicativo deve ser maior ou igual a zero")
        BigDecimal taxiCost
) {
}