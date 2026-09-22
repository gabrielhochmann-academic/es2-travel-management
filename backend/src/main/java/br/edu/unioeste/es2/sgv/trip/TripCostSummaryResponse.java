package br.edu.unioeste.es2.sgv.trip;

import java.math.BigDecimal;
import java.util.UUID;

public record TripCostSummaryResponse(
        UUID id,
        String tripNumber,
        String destination,
        String employeeName,
        BigDecimal totalCost
) {
    public static TripCostSummaryResponse from(Trip trip) {
        if (trip == null) return null;
        return new TripCostSummaryResponse(
                trip.getId(),
                trip.getTripNumber(),
                trip.getDestination(),
                trip.getEmployeeName(),
                trip.getTotalCost()
        );
    }
}