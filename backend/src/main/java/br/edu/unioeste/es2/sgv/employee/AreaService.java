package br.edu.unioeste.es2.sgv.employee;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class AreaService {
    private final AreaRepository repository;

    public AreaService(AreaRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<AreaResponse> findAll() {
        return repository.findAllByOrderByNameAsc().stream()
                .map(AreaResponse::from)
                .toList();
    }

    @Transactional
    public AreaResponse create(CreateAreaRequest request) {
        String name = request.name().trim();
        if (repository.existsByNameIgnoreCase(name)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma área com este nome.");
        }
        return AreaResponse.from(repository.save(new Area(name)));
    }

    Area find(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Área não encontrada."));
    }
}
