package br.edu.unioeste.es2.sgv.trip;

import java.math.BigDecimal;
import java.util.UUID;

public record TripCostSummaryResponse(UUID id, String destination, BigDecimal totalCost) {
}
