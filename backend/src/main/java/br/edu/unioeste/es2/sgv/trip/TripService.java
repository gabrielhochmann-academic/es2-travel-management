package br.edu.unioeste.es2.sgv.trip;

import br.edu.unioeste.es2.sgv.employee.Employee;
import br.edu.unioeste.es2.sgv.employee.EmployeeRole;
import br.edu.unioeste.es2.sgv.employee.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class TripService {
    private final TripRepository tripRepository;
    private final TripStatusHistoryRepository historyRepository;
    private final TripCostHistoryRepository costHistoryRepository;
    private final EmployeeService employeeService;

    public TripService(TripRepository tripRepository,
                       TripStatusHistoryRepository historyRepository,
                       TripCostHistoryRepository costHistoryRepository,
                       EmployeeService employeeService) {
        this.tripRepository = tripRepository;
        this.historyRepository = historyRepository;
        this.costHistoryRepository = costHistoryRepository;
        this.employeeService = employeeService;
    }

    @Transactional(readOnly = true)
    public List<TripResponse> findAll() {
        return tripRepository.findAll().stream().map(TripResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<TripResponse> findByEmployee(UUID employeeId) {
        return tripRepository.findByEmployeeIdOrderByCreatedAtDesc(employeeId).stream()
                .map(TripResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public TripResponse findById(UUID id) {
        return responseWithHistory(find(id));
    }

    @Transactional
    public TripResponse create(CreateTripRequest request) {
        validateDates(request.departureDate(), request.returnDate());
        Employee employee = employeeService.find(request.employeeId());
        String number = "VG-%05d".formatted(tripRepository.nextTripNumber());
        Trip trip = tripRepository.save(new Trip(number, request.destination().trim(), request.departureDate(),
                request.returnDate(), request.reason().trim(), request.transportMode().trim(), employee));
        historyRepository.save(new TripStatusHistory(trip, TripStatus.RASCUNHO, employee, "Viagem criada"));
        return TripResponse.from(trip);
    }

    @Transactional
    public TripResponse update(UUID id, UpdateTripRequest request) {
        Trip trip = find(id);
        validateOwner(trip, request.employeeId());
        if (trip.getStatus() != TripStatus.RASCUNHO && trip.getStatus() != TripStatus.AJUSTES_SOLICITADOS) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Somente viagens editáveis podem ser alteradas.");
        }
        validateDates(request.departureDate(), request.returnDate());
        trip.updateData(request);
        return TripResponse.from(tripRepository.save(trip));
    }

    @Transactional
    public TripResponse submit(UUID id, TripActionRequest request) {
        Trip trip = find(id);
        validateOwner(trip, request.employeeId());
        if (trip.getStatus() != TripStatus.RASCUNHO && trip.getStatus() != TripStatus.AJUSTES_SOLICITADOS) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Somente viagens em rascunho ou ajuste podem ser submetidas.");
        }
        trip.snapshotEmployeeAssignment();
        trip.transitionTo(TripStatus.SOLICITADA, null);
        saveTransition(trip, trip.getEmployee(), "Viagem submetida para análise");
        return TripResponse.from(tripRepository.save(trip));
    }

    @Transactional
    public TripResponse cancel(UUID id, TripActionRequest request) {
        Trip trip = find(id);
        validateOwner(trip, request.employeeId());
        if (trip.getStatus() != TripStatus.RASCUNHO && trip.getStatus() != TripStatus.AJUSTES_SOLICITADOS) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "A viagem não pode mais ser cancelada neste estágio.");
        }
        trip.transitionTo(TripStatus.CANCELADA, null);
        saveTransition(trip, trip.getEmployee(), "Viagem cancelada pelo solicitante");
        return TripResponse.from(tripRepository.save(trip));
    }

    @Transactional
    public TripResponse decide(UUID id, DecisionRequest request) {
        Trip trip = find(id);
        if (trip.getStatus() != TripStatus.SOLICITADA) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Somente viagens solicitadas podem receber decisão.");
        }
        Employee manager = employeeService.find(request.managerId());
        if (manager.getCurrentRole() != EmployeeRole.GESTOR) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Somente gestores podem decidir uma viagem.");
        }
        if (request.status() != TripStatus.APROVADA && request.status() != TripStatus.REJEITADA
                && request.status() != TripStatus.AJUSTES_SOLICITADOS) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A decisão informada não é permitida.");
        }
        String justification = normalizeJustification(request.justification());
        if ((request.status() == TripStatus.REJEITADA || request.status() == TripStatus.AJUSTES_SOLICITADOS)
                && justification == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "A justificativa é obrigatória para rejeição ou ajustes.");
        }
        trip.transitionTo(request.status(), justification);
        saveTransition(trip, manager, justification);
        return responseWithHistory(tripRepository.save(trip));
    }

    @Transactional(readOnly = true)
    public List<TripStatusHistoryResponse> getHistory(UUID id) {
        find(id);
        return historyRepository.findByTripIdOrderByChangedAtAsc(id).stream()
                .map(TripStatusHistoryResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<TripCostHistoryResponse> getCostHistory(UUID id) {
        find(id);
        return costHistoryRepository.findByTripIdOrderByChangedAtAsc(id).stream()
                .map(TripCostHistoryResponse::from).toList();
    }

    @Transactional
    public TripResponse updateCosts(UUID id, UpdateCostsRequest request) {
        Trip trip = find(id);
        Employee responsible = employeeService.find(request.employeeId());
        if (!trip.getEmployee().getId().equals(responsible.getId())
                && responsible.getCurrentRole() != EmployeeRole.GESTOR) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Somente o solicitante ou um gestor pode alterar os custos.");
        }
        if (trip.getStatus() != TripStatus.RASCUNHO
                && trip.getStatus() != TripStatus.AJUSTES_SOLICITADOS
                && trip.getStatus() != TripStatus.APROVADA) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Os custos não podem ser alterados nesta situação.");
        }
        trip.defineCosts(request.transportCost(), request.lodgingCost(), request.taxiCost());
        costHistoryRepository.save(new TripCostHistory(trip, responsible, request.transportCost(),
                request.lodgingCost(), request.taxiCost()));
        return TripResponse.from(tripRepository.save(trip));
    }

    @Transactional(readOnly = true)
    public CostIndicatorsResponse costIndicators() {
        List<Trip> trips = tripRepository.findAll();
        BigDecimal grandTotal = trips.stream().map(Trip::getTotalCost).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal average = trips.isEmpty() ? BigDecimal.ZERO
                : grandTotal.divide(BigDecimal.valueOf(trips.size()), 2, RoundingMode.HALF_UP);
        long approvedCount = trips.stream().filter(trip -> trip.getStatus() == TripStatus.APROVADA).count();
        long rejectedCount = trips.stream().filter(trip -> trip.getStatus() == TripStatus.REJEITADA).count();
        BigDecimal totalTransport = trips.stream().map(Trip::getTransportCost).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalLodging = trips.stream().map(Trip::getLodgingCost).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalTaxi = trips.stream().map(Trip::getTaxiCost).reduce(BigDecimal.ZERO, BigDecimal::add);
        List<CategoryIndicatorResponse> byCategory = List.of(
                new CategoryIndicatorResponse("Deslocamento", totalTransport),
                new CategoryIndicatorResponse("Hospedagem", totalLodging),
                new CategoryIndicatorResponse("Táxi", totalTaxi)).stream()
                .sorted((first, second) -> second.total().compareTo(first.total())).toList();
        TripCostSummaryResponse mostExpensive = trips.stream()
                .max((first, second) -> first.getTotalCost().compareTo(second.getTotalCost()))
                .map(TripCostSummaryResponse::from).orElse(null);
        return new CostIndicatorsResponse(trips.size(), approvedCount, rejectedCount, grandTotal, average,
                byCategory, mostExpensive);
    }

    private void saveTransition(Trip trip, Employee responsible, String justification) {
        historyRepository.save(new TripStatusHistory(trip, trip.getStatus(), responsible, justification));
    }

    private TripResponse responseWithHistory(Trip trip) {
        return TripResponse.from(trip, historyRepository.findByTripIdOrderByChangedAtAsc(trip.getId()));
    }

    private Trip find(UUID id) {
        return tripRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Viagem não encontrada."));
    }

    private void validateOwner(Trip trip, UUID employeeId) {
        if (!trip.getEmployee().getId().equals(employeeId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "A ação deve ser realizada pelo solicitante da viagem.");
        }
    }

    private void validateDates(LocalDate departureDate, LocalDate returnDate) {
        if (returnDate.isBefore(departureDate)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "A data de retorno deve ser igual ou posterior à data de saída.");
        }
    }

    private String normalizeJustification(String justification) {
        return justification == null || justification.isBlank() ? null : justification.trim();
    }
}
