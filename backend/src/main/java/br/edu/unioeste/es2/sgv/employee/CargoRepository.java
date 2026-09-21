package br.edu.unioeste.es2.sgv.employee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CargoRepository extends JpaRepository<Cargo, UUID> {
    boolean existsByNameIgnoreCase(String name);
}
