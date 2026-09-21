package br.edu.unioeste.es2.sgv.trip;

import java.math.BigDecimal;
import java.util.List;

/**
 * Funcionalidade CUSTOS (dashboard):
 *   - custo total previsto;
 *   - custo médio por viagem;
 *   - ranking de custo por categoria (deslocamento/hospedagem/táxi);
 *   - a viagem de maior custo total.
 */
public record CostIndicatorsResponse(
        int tripCount,
        long approvedTripCount,
        long rejectedTripCount,
        BigDecimal grandTotalCost,
        BigDecimal averageCostPerTrip,
        List<CategoryIndicatorResponse> costByCategory,
        TripCostSummaryResponse mostExpensiveTrip) { }
