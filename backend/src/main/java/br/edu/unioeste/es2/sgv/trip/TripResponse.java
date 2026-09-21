package br.edu.unioeste.es2.sgv.trip;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record TripResponse(UUID id, String destination, LocalDate departureDate, LocalDate returnDate, String reason,
                           String transportMode, String responsibleName, TripStatus status,
                           BigDecimal transportCost, BigDecimal lodgingCost, BigDecimal taxiCost, BigDecimal totalCost) {
    static TripResponse from(Trip trip) {
        return new TripResponse(trip.getId(), trip.getDestination(), trip.getDepartureDate(), trip.getReturnDate(), trip.getReason(),
                trip.getTransportMode(), trip.getResponsibleName(), trip.getStatus(),
                trip.getTransportCost(), trip.getLodgingCost(), trip.getTaxiCost(), trip.getTotalCost());
    }
}
