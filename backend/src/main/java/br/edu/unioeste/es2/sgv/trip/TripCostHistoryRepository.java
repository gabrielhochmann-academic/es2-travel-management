package br.edu.unioeste.es2.sgv.trip;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TripCostHistoryRepository extends JpaRepository<TripCostHistory, UUID> {
    List<TripCostHistory> findByTripIdOrderByChangedAtAsc(UUID tripId);
}
