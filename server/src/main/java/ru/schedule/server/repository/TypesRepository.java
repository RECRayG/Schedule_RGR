package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.Types;

import java.util.Optional;

public interface TypesRepository extends JpaRepository<Types, Long> {
    Optional<Types> findTypesByType(String type);
}
