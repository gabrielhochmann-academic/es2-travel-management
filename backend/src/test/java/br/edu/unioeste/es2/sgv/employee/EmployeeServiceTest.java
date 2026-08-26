package br.edu.unioeste.es2.sgv.employee;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {
    @Test
    void rejectsDuplicateRegistrationNumber() {
        EmployeeRepository repository = mock(EmployeeRepository.class);
        when(repository.existsByRegistrationNumber("12345")).thenReturn(true);
        EmployeeService service = new EmployeeService(repository);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.create(new CreateEmployeeRequest("12345", "Ana Silva", "Operações")));

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        verify(repository, never()).save(any());
    }

    @Test
    void createsEmployeeWithTrimmedRequiredData() {
        EmployeeRepository repository = mock(EmployeeRepository.class);
        when(repository.save(any(Employee.class))).thenAnswer(invocation -> invocation.getArgument(0));
        EmployeeService service = new EmployeeService(repository);

        EmployeeResponse response = service.create(new CreateEmployeeRequest(" 12345 ", " Ana Silva ", " Operações "));

        assertEquals("12345", response.registrationNumber());
        assertEquals("Ana Silva", response.name());
        assertEquals("Operações", response.area());
    }
}
