package ru.schedule.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.schedule.server.dto.GroupsResponse;
import ru.schedule.server.model.*;
import ru.schedule.server.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.sql.Types.NULL;

@CrossOrigin("*")//origins = {"http://localhost:3000/"}) // Для доступности порта 8080 (сервер) для 3000 (клиент), либо всем ("*")
@RestController
@RequestMapping("/api/groups")
public class GroupsController {
    @Autowired
    private GroupsRepository groupsRepository;

    @Autowired
    private GrSchIdentityRepository grSchIdentityRepository;

    @Autowired
    private SchedulesRepository schedulesRepository;

    @Autowired
    private TimesRepository timesRepository;

    @Autowired
    private NumberOfWeeksRepository numberOfWeeksRepository;

    @GetMapping
    public ResponseEntity<List<GroupsResponse>> getAllGroups() {
        List<Groups> listGr = groupsRepository.findAll(); // Поиск всех групп в базе

        List<GroupsResponse> groupsResponseList = new ArrayList<>();
        listGr.forEach(group -> {
            GroupsResponse groupsResponse = new GroupsResponse();

            groupsResponse.setId(group.getIdGroup());
            groupsResponse.setGroupName(group.getGroupName());

            groupsResponseList.add(groupsResponse);
        });

        return new ResponseEntity<List<GroupsResponse>>(groupsResponseList, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<GroupsResponse> getGroupById(@PathVariable int id) {
        Groups group = groupsRepository.findById(Long.valueOf(id)).get(); // Поиск группы в базе по id

        return new ResponseEntity<GroupsResponse>(GroupsResponse.builder()
                                                .id(group.getIdGroup())
                                                .groupName(group.getGroupName())
                                                .build(),
                                                HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addGroup(@RequestBody GroupsResponse insertGroup) {
        if(insertGroup.getGroupName().trim().equals("")) {
            return ResponseEntity.status(400).body("GroupName is Null");
        }

        var group = Groups.builder()
                .groupName(insertGroup.getGroupName())
                .build();

        groupsRepository.save(group);

        int countNumberOfWeeks = numberOfWeeksRepository.findAll().size();
        int countTimes = timesRepository.findAll().size();

        if(countNumberOfWeeks == NULL) {
            for(int i = 0; i < 18; i++) {
                NumberOfWeeks numberOfWeeks = new NumberOfWeeks();
                numberOfWeeks.setNumberWeek(i + 1);
                numberOfWeeks.setGrSchIdentitiesByIdNumberOfWeek(new ArrayList<>());
                numberOfWeeksRepository.save(numberOfWeeks);
            }
        }

        List<GrSchIdentity> grSchIdentityList = new ArrayList<>();
        for(int i = 0; i < countNumberOfWeeks; i++) {
            // Получить номер недели по значению
            NumberOfWeeks numberOfWeeks =
                    numberOfWeeksRepository.findById(Long.valueOf(numberOfWeeksRepository
                            .findNumberOfWeeksByNumberWeek(i + 1).get().getIdNumberOfWeek())).get();

            for(int j = 0; j < countTimes; j++) {
                /// Сделать добавление для каждого дня недели по 8 занятий с разными временами!!!
                List<Times> times = new ArrayList<>();
                switch(j) {
                    case 0:
                        times = timesRepository.findTimesByDaysByIdDay_Day("Понедельник").get();
                        break;
                    case 1:
                        times = timesRepository.findTimesByDaysByIdDay_Day("Вторник").get();
                        break;
                    case 2:
                        times = timesRepository.findTimesByDaysByIdDay_Day("Среда").get();
                        break;
                    case 3:
                        times = timesRepository.findTimesByDaysByIdDay_Day("Четверг").get();
                        break;
                    case 4:
                        times = timesRepository.findTimesByDaysByIdDay_Day("Пятница").get();
                        break;
                    case 5:
                        times = timesRepository.findTimesByDaysByIdDay_Day("Суббота").get();
                        break;
                }

                for(int k = 0; k < times.size(); k++) {
                    Schedules schedules = new Schedules();
                    schedules.setTypesByIdType(null);
                    schedules.setAuditoriesByIdAuditory(null);
                    schedules.setProfessorsByIdProfessor(null);
                    schedules.setTypesByIdType(null);
                    schedules.setSubjectsByIdSubject(null);

                    schedules = schedulesRepository.save(schedules);
                    int idSchedule = schedules.getIdSchedule();


                    GrSchIdentity grSchIdentity = new GrSchIdentity();
                    grSchIdentity.setGroupsByIdGroup(group);
                    grSchIdentity.setSchedulesByIdSchedule(schedules);
                    grSchIdentity.setNumberOfWeeksByIdNumberOfWeek(numberOfWeeks);


                    grSchIdentity.setTimesByIdTime(times.get(k));

                    grSchIdentityRepository.save(grSchIdentity);
                }
            }
        }

        return new ResponseEntity<GroupsResponse>(GroupsResponse.builder()
                                                .groupName(group.getGroupName())
                                                .build(),
                                                HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateGroup(@PathVariable int id, @RequestBody GroupsResponse newGroup) {
        if(newGroup.getGroupName().trim().equals("")) {
            return ResponseEntity.status(400).body("GroupName is Null");
        }

        Groups group = groupsRepository.findById(Long.valueOf(id)).get();

        group.setGroupName(newGroup.getGroupName());
        groupsRepository.save(group);

        return new ResponseEntity<GroupsResponse>(GroupsResponse.builder()
                                                .id(group.getIdGroup())
                                                .groupName(group.getGroupName())
                                                .build(),
                                                HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteGroup(@PathVariable int id) {
        Groups group = groupsRepository.findById(Long.valueOf(id)).get(); // Поиск группы в базе по id

        // При удалении группы удаляются соответствующие позиции в расписании
        if(!group.getGrSchIdentitiesByIdGroup().isEmpty()) {
            group.getGrSchIdentitiesByIdGroup().forEach(identity -> {
                Schedules schedule = schedulesRepository.findById(Long.valueOf(identity.getSchedulesByIdSchedule().getIdSchedule())).get();
                schedulesRepository.delete(schedule);
            });
        }

        groupsRepository.delete(group);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
