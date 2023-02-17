package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.GrSchIdentity;
import ru.schedule.server.model.Schedules;

import java.util.Optional;

public interface GrSchIdentityRepository extends JpaRepository<GrSchIdentity, Long> {
    Optional<GrSchIdentity> findGrSchIdentitiesBySchedulesByIdSchedule(Schedules schedule);
}
