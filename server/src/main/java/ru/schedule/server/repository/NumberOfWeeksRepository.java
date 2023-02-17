package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.NumberOfWeeks;

import java.util.Optional;

public interface NumberOfWeeksRepository extends JpaRepository<NumberOfWeeks, Long> {
    Optional<NumberOfWeeks> findNumberOfWeeksByNumberWeek(int numberWeek);
}
