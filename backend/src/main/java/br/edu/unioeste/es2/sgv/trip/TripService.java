package br.edu.unioeste.es2.sgv.trip;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

@Service
public class TripService {
    private final TripRepository repository;
    public TripService(TripRepository repository) { this.repository = repository; }
    public List<TripResponse> findAll() { return repository.findAll().stream().map(TripResponse::from).toList(); }
    public TripResponse create(CreateTripRequest request) {
        if (request.returnDate().isBefore(request.departureDate())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A data de retorno deve ser igual ou posterior à data de saída.");
        return TripResponse.from(repository.save(new Trip(request.destination(), request.departureDate(), request.returnDate(), request.reason(), request.transportMode(), request.responsibleName())));
    }
    public TripResponse submit(UUID id) {
        Trip trip = find(id);
        if (trip.getStatus() != TripStatus.RASCUNHO) throw new ResponseStatusException(HttpStatus.CONFLICT, "Somente viagens em rascunho podem ser submetidas.");
        trip.updateStatus(TripStatus.SOLICITADA);
        return TripResponse.from(repository.save(trip));
    }
    public TripResponse decide(UUID id, DecisionRequest request) {
        Trip trip = find(id);
        if (trip.getStatus() != TripStatus.SOLICITADA) throw new ResponseStatusException(HttpStatus.CONFLICT, "Somente viagens solicitadas podem receber decisão.");
        if (request.status() != TripStatus.APROVADA && request.status() != TripStatus.REJEITADA) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A decisão deve aprovar ou rejeitar a viagem.");
        if (request.status() == TripStatus.REJEITADA && (request.justification() == null || request.justification().isBlank())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A justificativa é obrigatória para rejeição.");
        trip.updateStatus(request.status());
        return TripResponse.from(repository.save(trip));
    }

    /** Funcionalidade CUSTOS — grava os três custos informados; o total é sempre calculado (nunca digitado). */
    public TripResponse updateCosts(UUID id, UpdateCostsRequest request) {
        Trip trip = find(id);
        trip.defineCosts(request.transportCost(), request.lodgingCost(), request.taxiCost());
        return TripResponse.from(repository.save(trip));
    }

    /** Funcionalidade CUSTOS — indicadores do dashboard, calculados a partir de todas as viagens do banco. */
    public CostIndicatorsResponse costIndicators() {
        List<Trip> trips = repository.findAll();

        BigDecimal grandTotal = trips.stream().map(Trip::getTotalCost).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal average = trips.isEmpty()
                ? BigDecimal.ZERO
                : grandTotal.divide(BigDecimal.valueOf(trips.size()), 2, RoundingMode.HALF_UP);

        BigDecimal totalTransport = trips.stream().map(Trip::getTransportCost).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalLodging = trips.stream().map(Trip::getLodgingCost).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalTaxi = trips.stream().map(Trip::getTaxiCost).reduce(BigDecimal.ZERO, BigDecimal::add);
        List<CategoryIndicatorResponse> byCategory = List.of(
                new CategoryIndicatorResponse("Deslocamento", totalTransport),
                new CategoryIndicatorResponse("Hospedagem", totalLodging),
                new CategoryIndicatorResponse("Táxi", totalTaxi)
        ).stream().sorted((a, b) -> b.total().compareTo(a.total())).toList();

        TripCostSummaryResponse mostExpensive = trips.stream()
                .max((a, b) -> a.getTotalCost().compareTo(b.getTotalCost()))
                .map(t -> new TripCostSummaryResponse(t.getId(), t.getDestination(), t.getTotalCost()))
                .orElse(null);

        return new CostIndicatorsResponse(trips.size(), grandTotal, average, byCategory, mostExpensive);
    }

    private Trip find(UUID id) { return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Viagem não encontrada.")); }
}
