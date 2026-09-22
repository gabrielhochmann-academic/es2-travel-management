package br.edu.unioeste.es2.sgv.employee;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CargoServiceTest {
    @Test
    void rejectsDuplicateNameIgnoringCase() {
        CargoRepository repository = mock(CargoRepository.class);
        when(repository.existsByNameIgnoreCase("Analista")).thenReturn(true);
        CargoService service = new CargoService(repository);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.create(new CreateCargoRequest(" Analista ", EmployeeRole.COLABORADOR)));

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        verify(repository, never()).save(any());
    }

    @Test
    void createsAndOrdersCatalogByName() {
        CargoRepository repository = mock(CargoRepository.class);
        when(repository.save(any(Cargo.class))).thenAnswer(invocation -> invocation.getArgument(0));
        CargoService service = new CargoService(repository);

        CargoResponse created = service.create(new CreateCargoRequest(" Analista de sistemas ", EmployeeRole.COLABORADOR));
        assertEquals("Analista de sistemas", created.name());
        assertEquals(EmployeeRole.COLABORADOR, created.role());

        Cargo gestor = new Cargo("Gestor de viagens", EmployeeRole.GESTOR);
        when(repository.findAllByOrderByNameAsc()).thenReturn(List.of(new Cargo("Analista", EmployeeRole.COLABORADOR), gestor));
        assertEquals("Analista", service.findAll().getFirst().name());
    }
}
