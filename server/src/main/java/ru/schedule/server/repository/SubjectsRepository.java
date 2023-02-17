package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.Subjects;

import java.util.Optional;

public interface SubjectsRepository extends JpaRepository<Subjects, Long> {
    Optional<Subjects> findSubjectsBySubject(String subject);
}
