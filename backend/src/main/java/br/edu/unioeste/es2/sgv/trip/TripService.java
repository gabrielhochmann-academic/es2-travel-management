package br.edu.unioeste.es2.sgv.trip;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
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
    private Trip find(UUID id) { return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Viagem não encontrada.")); }
}
