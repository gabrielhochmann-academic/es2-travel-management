package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.Employee;
import br.edu.unioeste.es2.sgv.employee.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class TripServiceTest {
    @Test
    void rejectsReturnDateBeforeDepartureDate() {
        TripRepository tripRepository = mock(TripRepository.class);
        EmployeeRepository employeeRepository = mock(EmployeeRepository.class);
        TripService service = new TripService(tripRepository, employeeRepository);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.create(new CreateTripRequest("Cascavel", LocalDate.of(2026, 9, 2), LocalDate.of(2026, 9, 1), "Reunião", "Terrestre", UUID.randomUUID())));

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        verifyNoInteractions(tripRepository, employeeRepository);
    }

    @Test
    void createsDraftAssociatedWithExistingEmployee() {
        TripRepository tripRepository = mock(TripRepository.class);
        EmployeeRepository employeeRepository = mock(EmployeeRepository.class);
        Employee employee = new Employee("12345", "Ana Silva", "Operações");
        UUID employeeId = UUID.randomUUID();
        when(employeeRepository.findById(employeeId)).thenReturn(Optional.of(employee));
        when(tripRepository.nextTripNumber()).thenReturn(7L);
        when(tripRepository.save(any(Trip.class))).thenAnswer(invocation -> invocation.getArgument(0));
        TripService service = new TripService(tripRepository, employeeRepository);

        TripResponse response = service.create(new CreateTripRequest("Cascavel", LocalDate.of(2026, 9, 1), LocalDate.of(2026, 9, 2), "Reunião", "Terrestre", employeeId));

        assertEquals("VG-00007", response.tripNumber());
        assertEquals(TripStatus.RASCUNHO, response.status());
        assertEquals("Ana Silva", response.employee().name());
    }

    @Test
    void requiresJustificationWhenRejectingSubmittedTrip() {
        TripRepository tripRepository = mock(TripRepository.class);
        EmployeeRepository employeeRepository = mock(EmployeeRepository.class);
        Employee employee = new Employee("12345", "Ana Silva", "Operações");
        Trip trip = new Trip("VG-00001", "Cascavel", LocalDate.of(2026, 9, 1), LocalDate.of(2026, 9, 2), "Reunião", "Terrestre", employee);
        trip.submit();
        UUID tripId = UUID.randomUUID();
        when(tripRepository.findById(tripId)).thenReturn(Optional.of(trip));
        TripService service = new TripService(tripRepository, employeeRepository);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.decide(tripId, new DecisionRequest(TripStatus.REJEITADA, " ")));

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        verify(tripRepository, never()).save(any());
    }
}
