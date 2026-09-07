package br.edu.unioeste.es2.sgv.trip;
import jakarta.validation.Valid; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/trips") @CrossOrigin(origins="${app.cors-origin:http://localhost:5173}")
public class TripController{
 private final TripService service; public TripController(TripService s){service=s;}
 @GetMapping public List<TripResponse> all(){return service.all();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public TripResponse create(@Valid @RequestBody CreateTripRequest r){return service.create(r);}
 @PutMapping("/{id}") public TripResponse update(@PathVariable UUID id,@Valid @RequestBody UpdateTripRequest r){return service.update(id,r);}
 @PostMapping("/{id}/submit") public TripResponse submit(@PathVariable UUID id,@RequestParam UUID requesterId){return service.submit(id,requesterId);}
 @PostMapping("/{id}/cancel") public TripResponse cancel(@PathVariable UUID id,@RequestParam UUID requesterId){return service.cancel(id,requesterId);}
 @PostMapping("/{id}/decision") public TripResponse decide(@PathVariable UUID id,@Valid @RequestBody DecisionRequest r){return service.decide(id,r);}
 @PostMapping("/{id}/adjustments") public TripResponse adjustments(@PathVariable UUID id,@Valid @RequestBody AdjustmentRequest r){return service.requestAdjustments(id,r);}
 @GetMapping("/{id}/history") public List<TripHistoryResponse> history(@PathVariable UUID id){return service.history(id);}
}
