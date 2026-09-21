package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "${app.cors-origin:http://localhost:5173}")
public class TripController {
    private final TripService service;

    public TripController(TripService service) {
        this.service = service;
    }

    @GetMapping
    public List<TripResponse> findAll() {
        return service.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TripResponse create(@Valid @RequestBody CreateTripRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public TripResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTripRequest request) {
        return service.update(id, request);
    }

    @PostMapping("/{id}/submit")
    public TripResponse submit(@PathVariable UUID id, @Valid @RequestBody TripActionRequest request) {
        return service.submit(id, request);
    }

    @PostMapping("/{id}/cancel")
    public TripResponse cancel(@PathVariable UUID id, @Valid @RequestBody TripActionRequest request) {
        return service.cancel(id, request);
    }

    @PostMapping("/{id}/decision")
    public TripResponse decide(@PathVariable UUID id, @Valid @RequestBody DecisionRequest request) {
        return service.decide(id, request);
    }

    @PutMapping("/{id}/costs")
    public TripResponse updateCosts(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateCostsRequest request) {
        return service.updateCosts(id, request);
    }

    @GetMapping("/indicators/costs")
    public CostIndicatorsResponse costIndicators() {
        return service.costIndicators();
    }
}
