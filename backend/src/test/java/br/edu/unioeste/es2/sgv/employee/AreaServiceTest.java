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

class AreaServiceTest {
    @Test
    void rejectsDuplicateNameIgnoringCase() {
        AreaRepository repository = mock(AreaRepository.class);
        when(repository.existsByNameIgnoreCase("Informática")).thenReturn(true);
        AreaService service = new AreaService(repository);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.create(new CreateAreaRequest(" Informática ")));

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        verify(repository, never()).save(any());
    }

    @Test
    void createsTrimmedNameAndOrdersAreas() {
        AreaRepository repository = mock(AreaRepository.class);
        when(repository.save(any(Area.class))).thenAnswer(invocation -> invocation.getArgument(0));
        AreaService service = new AreaService(repository);

        assertEquals("Recursos Humanos", service.create(new CreateAreaRequest(" Recursos Humanos ")).name());
        when(repository.findAllByOrderByNameAsc()).thenReturn(List.of(new Area("Informática"), new Area("Recursos Humanos")));
        assertEquals("Informática", service.findAll().getFirst().name());
    }
}
