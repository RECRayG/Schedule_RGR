package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.Auditories;

import java.util.Optional;

public interface AuditoriesRepository extends JpaRepository<Auditories, Long> {
    Optional<Auditories> findAuditoriesByAuditory(String auditory);
}
