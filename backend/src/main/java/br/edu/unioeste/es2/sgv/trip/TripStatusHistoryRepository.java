package br.edu.unioeste.es2.sgv.trip;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TripStatusHistoryRepository extends JpaRepository<TripStatusHistory, UUID> {
    List<TripStatusHistory> findByTripIdOrderByChangedAtAsc(UUID tripId);
}
