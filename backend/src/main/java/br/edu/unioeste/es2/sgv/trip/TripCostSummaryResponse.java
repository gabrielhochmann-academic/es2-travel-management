package br.edu.unioeste.es2.sgv.trip;

import java.math.BigDecimal;
import java.util.UUID;

/** Resumo enxuto de uma viagem usado nos indicadores (ex.: a viagem mais cara). */
public record TripCostSummaryResponse(UUID id, String destination, BigDecimal totalCost) { }
