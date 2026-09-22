package br.edu.unioeste.es2.sgv.trip;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record TripCostHistoryResponse(
        UUID id, UUID responsibleEmployeeId, String responsibleName,
        BigDecimal transportCost, BigDecimal lodgingCost, BigDecimal taxiCost,
        BigDecimal totalCost, OffsetDateTime changedAt) {
    static TripCostHistoryResponse from(TripCostHistory history) {
        BigDecimal total = history.getTransportCost()
                .add(history.getLodgingCost())
                .add(history.getTaxiCost());
        return new TripCostHistoryResponse(
                history.getId(), history.getResponsible().getId(), history.getResponsible().getName(),
                history.getTransportCost(), history.getLodgingCost(), history.getTaxiCost(), total,
                history.getChangedAt());
    }
}
