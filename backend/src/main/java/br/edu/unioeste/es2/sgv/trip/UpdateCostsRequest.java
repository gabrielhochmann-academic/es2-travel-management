package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

/** Funcionalidade CUSTOS: as três categorias que compõem o custo de uma viagem.
 *  O custo total nunca é enviado pelo cliente — é sempre calculado no backend. */
public record UpdateCostsRequest(
        @NotNull @PositiveOrZero BigDecimal transportCost,
        @NotNull @PositiveOrZero BigDecimal lodgingCost,
        @NotNull @PositiveOrZero BigDecimal taxiCost) { }
