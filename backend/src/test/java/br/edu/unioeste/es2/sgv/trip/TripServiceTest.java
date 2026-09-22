package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.Area;
import br.edu.unioeste.es2.sgv.employee.Cargo;
import br.edu.unioeste.es2.sgv.employee.Employee;
import br.edu.unioeste.es2.sgv.employee.EmployeeRole;
import br.edu.unioeste.es2.sgv.employee.EmployeeService;
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
        TripRepository trips = mock(TripRepository.class);
        TripService service = service(trips, mock(TripStatusHistoryRepository.class), mock(EmployeeService.class));
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.create(new CreateTripRequest("Cascavel", LocalDate.of(2026, 9, 2),
                        LocalDate.of(2026, 9, 1), "Reunião", "Terrestre", UUID.randomUUID())));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        verify(trips, never()).save(any());
    }

    @Test
    void createsDraftWithSequenceNumberAndRegisteredEmployee() {
        TripRepository trips = mock(TripRepository.class);
        TripStatusHistoryRepository history = mock(TripStatusHistoryRepository.class);
        EmployeeService employees = mock(EmployeeService.class);
        Employee requester = employee(EmployeeRole.COLABORADOR, UUID.randomUUID());
        when(employees.find(requester.getId())).thenReturn(requester);
        when(trips.nextTripNumber()).thenReturn(7L);
        when(trips.save(any(Trip.class))).thenAnswer(invocation -> invocation.getArgument(0));
        TripService service = service(trips, history, employees);

        TripResponse response = service.create(new CreateTripRequest("Curitiba", LocalDate.of(2026, 9, 20),
                LocalDate.of(2026, 9, 21), "Reunião", "Aéreo", requester.getId()));

        assertEquals("VG-00007", response.tripNumber());
        assertEquals(TripStatus.RASCUNHO, response.status());
        verify(trips).nextTripNumber();
        verify(history).save(any(TripStatusHistory.class));
    }

    @Test
    void onlyManagerCanDecideSubmittedTrip() {
        TripRepository trips = mock(TripRepository.class);
        TripStatusHistoryRepository history = mock(TripStatusHistoryRepository.class);
        EmployeeService employees = mock(EmployeeService.class);
        Employee requester = employee(EmployeeRole.COLABORADOR, UUID.randomUUID());
        Employee collaborator = employee(EmployeeRole.COLABORADOR, UUID.randomUUID());
        Trip trip = trip("Curitiba", requester);
        trip.transitionTo(TripStatus.SOLICITADA, null);
        UUID tripId = UUID.randomUUID();
        when(trips.findById(tripId)).thenReturn(Optional.of(trip));
        when(employees.find(collaborator.getId())).thenReturn(collaborator);
        TripService service = service(trips, history, employees);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.decide(tripId, new DecisionRequest(TripStatus.APROVADA, collaborator.getId(), null)));
        assertEquals(HttpStatus.FORBIDDEN, exception.getStatusCode());
        verify(trips, never()).save(any());
    }

    @Test
    void requiresJustificationForRequestedAdjustments() {
        TripRepository trips = mock(TripRepository.class);
        TripStatusHistoryRepository history = mock(TripStatusHistoryRepository.class);
        EmployeeService employees = mock(EmployeeService.class);
        Employee requester = employee(EmployeeRole.COLABORADOR, UUID.randomUUID());
        Employee manager = employee(EmployeeRole.GESTOR, UUID.randomUUID());
        Trip trip = trip("Curitiba", requester);
        trip.transitionTo(TripStatus.SOLICITADA, null);
        UUID tripId = UUID.randomUUID();
        when(trips.findById(tripId)).thenReturn(Optional.of(trip));
        when(employees.find(manager.getId())).thenReturn(manager);
        TripService service = service(trips, history, employees);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.decide(tripId, new DecisionRequest(TripStatus.AJUSTES_SOLICITADOS,
                        manager.getId(), " ")));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
    }

    @Test
    void rejectsCostChangeByUnrelatedCollaborator() {
        TripRepository trips = mock(TripRepository.class);
        TripStatusHistoryRepository history = mock(TripStatusHistoryRepository.class);
        EmployeeService employees = mock(EmployeeService.class);
        Employee owner = employee(EmployeeRole.COLABORADOR, UUID.randomUUID());
        Employee other = employee(EmployeeRole.COLABORADOR, UUID.randomUUID());
        Trip trip = trip("Curitiba", owner);
        when(trips.findById(any())).thenReturn(Optional.of(trip));
        when(employees.find(other.getId())).thenReturn(other);
        TripService service = service(trips, history, employees);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.updateCosts(UUID.randomUUID(), new UpdateCostsRequest(
                        BigDecimal.TEN, BigDecimal.ZERO, BigDecimal.ZERO, other.getId())));
        assertEquals(HttpStatus.FORBIDDEN, exception.getStatusCode());
        verify(trips, never()).save(any());
    }

    @Test
    void recordsCostChangeByOwner() {
        TripRepository trips = mock(TripRepository.class);
        TripStatusHistoryRepository history = mock(TripStatusHistoryRepository.class);
        TripCostHistoryRepository costHistory = mock(TripCostHistoryRepository.class);
        EmployeeService employees = mock(EmployeeService.class);
        Employee owner = employee(EmployeeRole.COLABORADOR, UUID.randomUUID());
        Trip trip = trip("Curitiba", owner);
        UUID tripId = UUID.randomUUID();
        when(trips.findById(tripId)).thenReturn(Optional.of(trip));
        when(employees.find(owner.getId())).thenReturn(owner);
        when(trips.save(any(Trip.class))).thenAnswer(invocation -> invocation.getArgument(0));
        TripService service = new TripService(trips, history, costHistory, employees);

        service.updateCosts(tripId, new UpdateCostsRequest(new BigDecimal("10"), BigDecimal.ZERO,
                new BigDecimal("5"), owner.getId()));

        verify(costHistory).save(any(TripCostHistory.class));
        assertEquals(new BigDecimal("15"), trip.getTotalCost());
    }

    @Test
    void calculatesIndicators() {
        TripRepository trips = mock(TripRepository.class);
        Employee requester = employee(EmployeeRole.COLABORADOR, UUID.randomUUID());
        Trip approved = trip("Curitiba", requester);
        approved.transitionTo(TripStatus.APROVADA, null);
        approved.defineCosts(new BigDecimal("100"), new BigDecimal("200"), new BigDecimal("50"));
        Trip rejected = trip("Maringá", requester);
        rejected.transitionTo(TripStatus.REJEITADA, "Orçamento indisponível");
        rejected.defineCosts(new BigDecimal("50"), new BigDecimal("100"), BigDecimal.ZERO);
        when(trips.findAll()).thenReturn(List.of(approved, rejected));
        TripService service = service(trips, mock(TripStatusHistoryRepository.class), mock(EmployeeService.class));

        CostIndicatorsResponse response = service.costIndicators();

        assertEquals(2, response.tripCount());
        assertEquals(1, response.approvedTripCount());
        assertEquals(1, response.rejectedTripCount());
        assertEquals(new BigDecimal("500"), response.grandTotalCost());
        assertEquals(new BigDecimal("250.00"), response.averageCostPerTrip());
    }

    private TripService service(TripRepository trips, TripStatusHistoryRepository history, EmployeeService employees) {
        return new TripService(trips, history, mock(TripCostHistoryRepository.class), employees);
    }

    private Trip trip(String destination, Employee employee) {
        return new Trip("VG-00001", destination, LocalDate.of(2026, 9, 20), LocalDate.of(2026, 9, 21),
                "Atividade acadêmica", "Terrestre", employee);
    }

    private Employee employee(EmployeeRole role, UUID id) {
        Area area = mock(Area.class);
        Cargo cargo = mock(Cargo.class);
        when(area.getName()).thenReturn("Informática");
        when(cargo.getName()).thenReturn("Analista de sistemas");
        Employee employee = mock(Employee.class);
        when(employee.getId()).thenReturn(id);
        when(employee.getName()).thenReturn("Ana Silva");
        when(employee.getRegistrationNumber()).thenReturn("1234-5");
        when(employee.getCurrentArea()).thenReturn(area);
        when(employee.getCurrentCargo()).thenReturn(cargo);
        when(employee.getCurrentRole()).thenReturn(role);
        return employee;
    }
}
