package br.edu.unioeste.es2.sgv.employee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    boolean existsByRegistrationNumber(String registrationNumber);
}
