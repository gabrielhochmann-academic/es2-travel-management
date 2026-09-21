package br.edu.unioeste.es2.sgv.trip;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class TripServiceTest {
    @Test
    void rejectsReturnDateBeforeDepartureDate() {
        TripRepository repository = mock(TripRepository.class);
        TripService service = new TripService(repository);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.create(new CreateTripRequest(
                        "Cascavel",
                        LocalDate.of(2026, 9, 2),
                        LocalDate.of(2026, 9, 1),
                        "Reunião",
                        "Terrestre",
                        "Ana Silva")));

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        verify(repository, never()).save(any());
    }

    @Test
    void updatesThreeCostsAndCalculatesTotal() {
        TripRepository repository = mock(TripRepository.class);
        Trip trip = trip("Cascavel");
        UUID id = UUID.randomUUID();
        when(repository.findById(id)).thenReturn(Optional.of(trip));
        when(repository.save(any(Trip.class))).thenAnswer(invocation -> invocation.getArgument(0));
        TripService service = new TripService(repository);

        TripResponse response = service.updateCosts(id, new UpdateCostsRequest(
                new BigDecimal("100.00"),
                new BigDecimal("250.50"),
                new BigDecimal("49.50")));

        assertEquals(new BigDecimal("400.00"), response.totalCost());
    }

    @Test
    void calculatesStatusAndCostIndicators() {
        TripRepository repository = mock(TripRepository.class);
        Trip approved = trip("Curitiba");
        approved.updateStatus(TripStatus.APROVADA);
        approved.defineCosts(new BigDecimal("100"), new BigDecimal("200"), new BigDecimal("50"));
        Trip rejected = trip("Maringá");
        rejected.updateStatus(TripStatus.REJEITADA);
        rejected.defineCosts(new BigDecimal("50"), new BigDecimal("100"), BigDecimal.ZERO);
        when(repository.findAll()).thenReturn(List.of(approved, rejected));
        TripService service = new TripService(repository);

        CostIndicatorsResponse response = service.costIndicators();

        assertEquals(2, response.tripCount());
        assertEquals(1, response.approvedTripCount());
        assertEquals(1, response.rejectedTripCount());
        assertEquals(new BigDecimal("500"), response.grandTotalCost());
        assertEquals(new BigDecimal("250.00"), response.averageCostPerTrip());
        assertEquals("Hospedagem", response.costByCategory().getFirst().category());
        assertEquals("Curitiba", response.mostExpensiveTrip().destination());
    }

    private Trip trip(String destination) {
        return new Trip(
                destination,
                LocalDate.of(2026, 9, 20),
                LocalDate.of(2026, 9, 21),
                "Atividade acadêmica",
                "Terrestre",
                "Ana Silva");
    }
}
