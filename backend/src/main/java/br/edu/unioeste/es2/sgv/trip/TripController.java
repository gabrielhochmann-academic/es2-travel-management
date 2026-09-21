package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "${app.cors-origin:http://localhost:5173}")
public class TripController {
    private final TripService service;
    public TripController(TripService service) { this.service = service; }
    @GetMapping public List<TripResponse> findAll() { return service.findAll(); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public TripResponse create(@Valid @RequestBody CreateTripRequest request) { return service.create(request); }
    @PostMapping("/{id}/submit") public TripResponse submit(@PathVariable UUID id) { return service.submit(id); }
    @PostMapping("/{id}/decision") public TripResponse decide(@PathVariable UUID id, @Valid @RequestBody DecisionRequest request) { return service.decide(id, request); }

    /** Funcionalidade CUSTOS: grava os custos de deslocamento, hospedagem e táxi de uma viagem. */
    @PutMapping("/{id}/costs") public TripResponse updateCosts(@PathVariable UUID id, @Valid @RequestBody UpdateCostsRequest request) { return service.updateCosts(id, request); }

    /** Funcionalidade CUSTOS: indicadores do dashboard (total, médio, ranking por categoria, viagem mais cara). */
    @GetMapping("/indicators/costs") public CostIndicatorsResponse costIndicators() { return service.costIndicators(); }
}
