package br.edu.unioeste.es2.sgv.employee;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Comparator;
import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<EmployeeResponse> findAll() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Employee::getName, String.CASE_INSENSITIVE_ORDER))
                .map(EmployeeResponse::from)
                .toList();
    }

    public EmployeeResponse create(CreateEmployeeRequest request) {
        String registrationNumber = request.registrationNumber().trim();
        if (repository.existsByRegistrationNumber(registrationNumber)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um empregado com esta matrícula.");
        }
        Employee employee = new Employee(registrationNumber, request.name().trim(), request.area().trim());
        return EmployeeResponse.from(repository.save(employee));
    }
}
