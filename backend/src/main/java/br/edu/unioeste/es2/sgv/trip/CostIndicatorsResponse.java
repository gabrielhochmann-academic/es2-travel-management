package br.edu.unioeste.es2.sgv.trip;

import java.math.BigDecimal;
import java.util.List;

public record CostIndicatorsResponse(
        int tripCount,
        long approvedTripCount,
        long rejectedTripCount,
        BigDecimal grandTotalCost,
        BigDecimal averageCostPerTrip,
        List<CategoryIndicatorResponse> costByCategory,
        TripCostSummaryResponse mostExpensiveTrip) {
}
