package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.Professors;

import java.util.Optional;

public interface ProfessorsRepository extends JpaRepository<Professors, Long> {
    Optional<Professors> findByFirstNameAndLastNameAndMiddleName(String firstName, String lastName, String middleName);
}
