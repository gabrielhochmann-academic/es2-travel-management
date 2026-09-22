package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.EmployeeRole;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public record TripResponse(
        UUID id,
        String tripNumber,
        String destination,
        LocalDate departureDate,
        LocalDate returnDate,
        String reason,
        String transportMode,
        UUID employeeId,
        String responsibleName,
        String employeeRegistrationNumber,
        String employeeArea,
        String employeeCargo,
        EmployeeRole employeeRole,
        TripStatus status,
        String decisionJustification,
        BigDecimal transportCost,
        BigDecimal lodgingCost,
        BigDecimal taxiCost,
        BigDecimal totalCost,
        List<TripStatusHistoryResponse> statusHistory) {
    // Sobrecarga 1: Para listagens simples (sem carregar o histórico completo)
    public static TripResponse from(Trip trip) {
        return from(trip, Collections.emptyList());
    }

    // Sobrecarga 2: Para a visão detalhada de uma viagem (com linha do tempo)
    public static TripResponse from(Trip trip, List<TripStatusHistory> history) {
        List<TripStatusHistoryResponse> historyResponses = history == null ? Collections.emptyList()
                : history.stream().map(TripStatusHistoryResponse::from).toList();

        return new TripResponse(
                trip.getId(),
                trip.getTripNumber(),
                trip.getDestination(),
                trip.getDepartureDate(),
                trip.getReturnDate(),
                trip.getReason(),
                trip.getTransportMode(),
                trip.getEmployee() != null ? trip.getEmployee().getId() : null,
                trip.getEmployeeName(),
                trip.getEmployeeRegistrationNumber(),
                trip.getEmployeeArea(),
                trip.getEmployeeCargo(),
                trip.getEmployeeRole(),
                trip.getStatus(),
                trip.getDecisionJustification(),
                trip.getTransportCost(),
                trip.getLodgingCost(),
                trip.getTaxiCost(),
                trip.getTotalCost(),
                historyResponses);
    }
}