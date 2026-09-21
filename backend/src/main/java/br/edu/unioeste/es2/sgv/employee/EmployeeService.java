package br.edu.unioeste.es2.sgv.employee;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmploymentHistoryRepository historyRepository;
    private final AreaService areaService;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            EmploymentHistoryRepository historyRepository,
            AreaService areaService) {
        this.employeeRepository = employeeRepository;
        this.historyRepository = historyRepository;
        this.areaService = areaService;
    }

    @Transactional(readOnly = true)
    public List<EmployeeResponse> findAll() {
        return employeeRepository.findAll().stream()
                .sorted(Comparator.comparing(Employee::getName, String.CASE_INSENSITIVE_ORDER))
                .map(EmployeeResponse::from)
                .toList();
    }

    @Transactional
    public EmployeeResponse create(CreateEmployeeRequest request) {
        String registration = request.registrationNumber().trim();
        if (employeeRepository.existsByRegistrationNumber(registration)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um empregado com esta matrícula.");
        }
        Area area = areaService.find(request.areaId());
        Employee employee = employeeRepository.save(new Employee(registration, request.name().trim(), area, request.role()));
        historyRepository.save(new EmploymentHistory(employee, area, request.role()));
        return EmployeeResponse.from(employee);
    }

    @Transactional
    public EmployeeResponse updateAssignment(UUID id, UpdateEmployeeAssignmentRequest request) {
        Employee employee = find(id);
        Area area = areaService.find(request.areaId());
        if (employee.getCurrentArea().getId().equals(area.getId()) && employee.getCurrentRole() == request.role()) {
            return EmployeeResponse.from(employee);
        }
        historyRepository.findFirstByEmployeeIdAndValidToIsNullOrderByValidFromDesc(id)
                .ifPresent(EmploymentHistory::close);
        employee.changeAssignment(area, request.role());
        historyRepository.save(new EmploymentHistory(employee, area, request.role()));
        return EmployeeResponse.from(employeeRepository.save(employee));
    }

    @Transactional(readOnly = true)
    public List<EmploymentHistoryResponse> history(UUID id) {
        find(id);
        return historyRepository.findByEmployeeIdOrderByValidFromDesc(id).stream()
                .map(EmploymentHistoryResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public Employee find(UUID id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empregado não encontrado."));
    }
}
