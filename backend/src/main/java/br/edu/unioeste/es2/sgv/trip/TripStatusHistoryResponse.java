package br.edu.unioeste.es2.sgv.trip;

import java.time.OffsetDateTime;
import java.util.UUID;

public record TripStatusHistoryResponse(
        UUID id,
        TripStatus status,
        String responsibleName,
        String justification,
        OffsetDateTime changedAt) {
    static TripStatusHistoryResponse from(TripStatusHistory history) {
        return new TripStatusHistoryResponse(
                history.getId(),
                history.getStatus(),
                history.getResponsible().getName(),
                history.getJustification(),
                history.getChangedAt());
    }
}
