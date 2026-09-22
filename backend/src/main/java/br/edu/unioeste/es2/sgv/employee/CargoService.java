package br.edu.unioeste.es2.sgv.employee;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class CargoService {
    private final CargoRepository repository;

    public CargoService(CargoRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<CargoResponse> findAll() {
        return repository.findAllByOrderByNameAsc().stream()
                .map(CargoResponse::from)
                .toList();
    }

    @Transactional
    public CargoResponse create(CreateCargoRequest request) {
        String name = request.name().trim();
        if (repository.existsByNameIgnoreCase(name)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um cargo com este nome.");
        }
        return CargoResponse.from(repository.save(new Cargo(name, request.role())));
    }

    Cargo find(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cargo não encontrado."));
    }
}
