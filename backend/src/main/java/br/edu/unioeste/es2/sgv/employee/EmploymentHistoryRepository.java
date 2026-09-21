package br.edu.unioeste.es2.sgv.employee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmploymentHistoryRepository extends JpaRepository<EmploymentHistory, UUID> {
    List<EmploymentHistory> findByEmployeeIdOrderByValidFromDesc(UUID employeeId);
    Optional<EmploymentHistory> findFirstByEmployeeIdAndValidToIsNullOrderByValidFromDesc(UUID employeeId);
}
