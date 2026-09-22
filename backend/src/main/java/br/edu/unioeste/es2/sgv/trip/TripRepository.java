package br.edu.unioeste.es2.sgv.trip;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TripRepository extends JpaRepository<Trip, UUID> {
    @Query(value = "SELECT nextval('trip_number_seq')", nativeQuery = true)
    long nextTripNumber();

    @EntityGraph(attributePaths = {"employee"})
    List<Trip> findByEmployeeIdOrderByCreatedAtDesc(UUID employeeId);

    @Override
    @EntityGraph(attributePaths = {"employee"})
    List<Trip> findAll();
}
