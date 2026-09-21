package br.edu.unioeste.es2.sgv.employee;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class EmployeeServiceTest {
    @Test
    void rejectsDuplicateRegistrationNumber() {
        EmployeeRepository employees = mock(EmployeeRepository.class);
        when(employees.existsByRegistrationNumber("1234-5")).thenReturn(true);
        EmployeeService service = new EmployeeService(
                employees, mock(EmploymentHistoryRepository.class), mock(AreaService.class), mock(CargoService.class));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.create(new CreateEmployeeRequest(
                        "1234-5", "Ana Silva", UUID.randomUUID(), UUID.randomUUID())));

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        verify(employees, never()).save(any());
    }

    @Test
    void createsEmployeeAndInitialHistory() {
        EmployeeRepository employees = mock(EmployeeRepository.class);
        EmploymentHistoryRepository history = mock(EmploymentHistoryRepository.class);
        AreaService areas = mock(AreaService.class);
        CargoService cargos = mock(CargoService.class);
        Area area = new Area("Informática");
        Cargo cargo = new Cargo("Analista de sistemas", EmployeeRole.COLABORADOR);
        UUID areaId = UUID.randomUUID();
        UUID cargoId = UUID.randomUUID();
        when(areas.find(areaId)).thenReturn(area);
        when(cargos.find(cargoId)).thenReturn(cargo);
        when(employees.save(any(Employee.class))).thenAnswer(invocation -> invocation.getArgument(0));
        EmployeeService service = new EmployeeService(employees, history, areas, cargos);

        EmployeeResponse response = service.create(new CreateEmployeeRequest(
                "1234-5", " Ana Silva ", areaId, cargoId));

        assertEquals("1234-5", response.registrationNumber());
        assertEquals("Ana Silva", response.name());
        assertEquals("Analista de sistemas", response.cargo().name());
        assertEquals(EmployeeRole.COLABORADOR, response.role());
        verify(history).save(any(EmploymentHistory.class));
    }
}
