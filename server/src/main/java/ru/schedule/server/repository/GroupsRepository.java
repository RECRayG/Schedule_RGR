package ru.schedule.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.schedule.server.model.Groups;

import java.util.Optional;

public interface GroupsRepository extends JpaRepository<Groups, Long> {
    Optional<Groups> getGroupsByGroupName(String groupName);
}
