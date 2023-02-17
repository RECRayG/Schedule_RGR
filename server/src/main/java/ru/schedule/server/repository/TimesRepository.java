package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.Times;

import java.util.List;
import java.util.Optional;

public interface TimesRepository extends JpaRepository<Times, Long> {
    Optional<List<Times>> findTimesByDaysByIdDay_Day(String day);
}
