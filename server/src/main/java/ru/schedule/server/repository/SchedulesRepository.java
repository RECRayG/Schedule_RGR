package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.Schedules;

public interface SchedulesRepository extends JpaRepository<Schedules, Long> {

}
