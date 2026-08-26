package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.Employee;
import br.edu.unioeste.es2.sgv.employee.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class TripService {
    private final TripRepository repository;
    private final EmployeeRepository employeeRepository;

    public TripService(TripRepository repository, EmployeeRepository employeeRepository) {
        this.repository = repository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public List<TripResponse> findAll() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Trip::getTripNumber).reversed())
                .map(TripResponse::from)
                .toList();
    }

    @Transactional
    public TripResponse create(CreateTripRequest request) {
        if (request.returnDate().isBefore(request.departureDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A data de retorno deve ser igual ou posterior à data de saída.");
        }
        Employee employee = employeeRepository.findById(request.employeeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empregado não encontrado."));
        String tripNumber = "VG-" + String.format("%05d", repository.nextTripNumber());
        Trip trip = new Trip(tripNumber, request.destination().trim(), request.departureDate(), request.returnDate(), request.reason().trim(), request.transportMode().trim(), employee);
        return TripResponse.from(repository.save(trip));
    }

    @Transactional
    public TripResponse submit(UUID id) {
        Trip trip = find(id);
        if (trip.getStatus() != TripStatus.RASCUNHO) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Somente viagens em rascunho podem ser submetidas.");
        }
        trip.submit();
        return TripResponse.from(repository.save(trip));
    }

    @Transactional
    public TripResponse decide(UUID id, DecisionRequest request) {
        Trip trip = find(id);
        if (trip.getStatus() != TripStatus.SOLICITADA) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Somente viagens solicitadas podem receber decisão.");
        }
        if (request.status() != TripStatus.APROVADA && request.status() != TripStatus.REJEITADA) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A decisão deve aprovar ou rejeitar a viagem.");
        }
        String justification = request.justification() == null ? null : request.justification().trim();
        if (request.status() == TripStatus.REJEITADA && (justification == null || justification.isBlank())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A justificativa é obrigatória para rejeição.");
        }
        trip.decide(request.status(), justification);
        return TripResponse.from(repository.save(trip));
    }

    private Trip find(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Viagem não encontrada."));
    }
}
