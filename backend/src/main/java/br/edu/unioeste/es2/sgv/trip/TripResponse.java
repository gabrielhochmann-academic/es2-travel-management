package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.EmployeeResponse;
import java.time.LocalDate;
import java.util.UUID;

public record TripResponse(
        UUID id,
        String tripNumber,
        String destination,
        LocalDate departureDate,
        LocalDate returnDate,
        String reason,
        String transportMode,
        EmployeeResponse employee,
        TripStatus status,
        String decisionJustification
) {
    static TripResponse from(Trip trip) {
        return new TripResponse(
                trip.getId(),
                trip.getTripNumber(),
                trip.getDestination(),
                trip.getDepartureDate(),
                trip.getReturnDate(),
                trip.getReason(),
                trip.getTransportMode(),
                EmployeeResponse.from(trip.getEmployee()),
                trip.getStatus(),
                trip.getDecisionJustification()
        );
    }
}
