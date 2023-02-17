package ru.schedule.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.schedule.server.dto.*;
import ru.schedule.server.model.*;
import ru.schedule.server.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")//origins = {"http://localhost:3000/"}) // Для доступности порта 8080 (сервер) для 3000 (клиент), либо всем ("*")
@RestController
@RequestMapping("/api/schedules")
public class SchedulesController {
    @Autowired
    private GroupsRepository groupsRepository;

    @Autowired
    private ProfessorsRepository professorsRepository;

    @Autowired
    private SchedulesRepository schedulesRepository;

    @Autowired
    private NumberOfWeeksRepository numberOfWeeksRepository;

    @Autowired
    private GrSchIdentityRepository grSchIdentityRepository;

    @Autowired
    private AuditoriesRepository auditoriesRepository;

    @Autowired
    private SubjectsRepository subjectsRepository;

    @Autowired
    private TypesRepository typesRepository;

    @GetMapping("group/{idGroup}/week/{idWeek}")
    public ResponseEntity<List<SchedulesResponse>> getAllSchedulesByGroupAndWeek(@PathVariable int idGroup, @PathVariable int idWeek) {
        Groups group = groupsRepository.findById(Long.valueOf(idGroup)).get();
        NumberOfWeeks numberOfWeek = numberOfWeeksRepository.findById(Long.valueOf(idWeek)).get();

        List<GrSchIdentity> grSchIdentities = grSchIdentityRepository.findAll();

        List<SchedulesResponse> schedulesResponseList = new ArrayList<>();
        grSchIdentities.forEach(identity -> {
            if(identity.getGroupsByIdGroup().getIdGroup() == group.getIdGroup() &&
            identity.getNumberOfWeeksByIdNumberOfWeek().getIdNumberOfWeek() == numberOfWeek.getIdNumberOfWeek()) {
                if(identity.getSchedulesByIdSchedule().getProfessorsByIdProfessor() != null &&
                    identity.getSchedulesByIdSchedule() != null) {
                    schedulesResponseList.add(
                            SchedulesResponse.builder()
                                    .id(identity.getSchedulesByIdSchedule().getIdSchedule())
                                    .group(GroupsResponse.builder()
                                            .id(identity.getGroupsByIdGroup().getIdGroup())
                                            .groupName(identity.getGroupsByIdGroup().getGroupName())
                                            .build())
                                    .professor(ProfessorsResponse.builder()
                                            .id(identity.getSchedulesByIdSchedule().getProfessorsByIdProfessor().getIdProfessor())
                                            .lastName(identity.getSchedulesByIdSchedule().getProfessorsByIdProfessor().getLastName())
                                            .firstName(identity.getSchedulesByIdSchedule().getProfessorsByIdProfessor().getFirstName())
                                            .middleName(identity.getSchedulesByIdSchedule().getProfessorsByIdProfessor().getMiddleName())
                                            .build())
                                    .numberOfWeek(identity.getNumberOfWeeksByIdNumberOfWeek().getNumberWeek())
                                    .day(identity.getTimesByIdTime().getDaysByIdDay().getDay())
                                    .timeBegin(String.valueOf(identity.getTimesByIdTime().getTimeOfLessonsByIdBegin().getTimeLesson()))
                                    .timeEnd(String.valueOf(identity.getTimesByIdTime().getTimeOfLessonsByIdEnd().getTimeLesson()))
                                    .subject(identity.getSchedulesByIdSchedule().getSubjectsByIdSubject().getSubject())
                                    .auditory(identity.getSchedulesByIdSchedule().getAuditoriesByIdAuditory().getAuditory())
                                    .type(identity.getSchedulesByIdSchedule().getTypesByIdType().getType())
                                    .build()
                    );
                } else {
                    schedulesResponseList.add(
                            SchedulesResponse.builder()
                                    .id(identity.getSchedulesByIdSchedule().getIdSchedule())
                                    .group(GroupsResponse.builder()
                                            .id(identity.getGroupsByIdGroup().getIdGroup())
                                            .groupName(identity.getGroupsByIdGroup().getGroupName())
                                            .build())
                                    .professor(ProfessorsResponse.builder()
                                            .id(0)
                                            .lastName("")
                                            .firstName("")
                                            .middleName("")
                                            .build())
                                    .numberOfWeek(identity.getNumberOfWeeksByIdNumberOfWeek().getNumberWeek())
                                    .day(identity.getTimesByIdTime().getDaysByIdDay().getDay())
                                    .timeBegin(String.valueOf(identity.getTimesByIdTime().getTimeOfLessonsByIdBegin().getTimeLesson()))
                                    .timeEnd(String.valueOf(identity.getTimesByIdTime().getTimeOfLessonsByIdEnd().getTimeLesson()))
                                    .subject("")
                                    .auditory("")
                                    .type("")
                                    .build()
                    );
                }
            }
        });

        return new ResponseEntity<List<SchedulesResponse>>(schedulesResponseList, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<SchedulesResponse> getScheduleById(@PathVariable int id) {
        Schedules schedule = schedulesRepository.findById(Long.valueOf(id)).get();
        GrSchIdentity grSchIdentity = grSchIdentityRepository.findGrSchIdentitiesBySchedulesByIdSchedule(schedule).get();

        if(schedule.getProfessorsByIdProfessor() != null &&
                schedule != null) {
            return new ResponseEntity<SchedulesResponse>(SchedulesResponse.builder()
                    .id(schedule.getIdSchedule())
                    .group(GroupsResponse.builder()
                            .id(grSchIdentity.getGroupsByIdGroup().getIdGroup())
                            .groupName(grSchIdentity.getGroupsByIdGroup().getGroupName())
                            .build())
                    .professor(ProfessorsResponse.builder()
                            .id(schedule.getProfessorsByIdProfessor().getIdProfessor())
                            .lastName(schedule.getProfessorsByIdProfessor().getLastName())
                            .firstName(schedule.getProfessorsByIdProfessor().getFirstName())
                            .middleName(schedule.getProfessorsByIdProfessor().getMiddleName())
                            .build())
                    .numberOfWeek(grSchIdentity.getNumberOfWeeksByIdNumberOfWeek().getNumberWeek())
                    .day(grSchIdentity.getTimesByIdTime().getDaysByIdDay().getDay())
                    .timeBegin(String.valueOf(grSchIdentity.getTimesByIdTime().getTimeOfLessonsByIdBegin().getTimeLesson()))
                    .timeEnd(String.valueOf(grSchIdentity.getTimesByIdTime().getTimeOfLessonsByIdEnd().getTimeLesson()))
                    .subject(schedule.getSubjectsByIdSubject().getSubject())
                    .auditory(schedule.getAuditoriesByIdAuditory().getAuditory())
                    .type(schedule.getTypesByIdType().getType())
                    .build(),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<SchedulesResponse>(SchedulesResponse.builder()
                    .id(schedule.getIdSchedule())
                    .group(GroupsResponse.builder()
                            .id(grSchIdentity.getGroupsByIdGroup().getIdGroup())
                            .groupName(grSchIdentity.getGroupsByIdGroup().getGroupName())
                            .build())
                    .professor(ProfessorsResponse.builder()
                            .id(0)
                            .lastName("")
                            .firstName("")
                            .middleName("")
                            .build())
                    .numberOfWeek(grSchIdentity.getNumberOfWeeksByIdNumberOfWeek().getNumberWeek())
                    .day(grSchIdentity.getTimesByIdTime().getDaysByIdDay().getDay())
                    .timeBegin(String.valueOf(grSchIdentity.getTimesByIdTime().getTimeOfLessonsByIdBegin().getTimeLesson()))
                    .timeEnd(String.valueOf(grSchIdentity.getTimesByIdTime().getTimeOfLessonsByIdEnd().getTimeLesson()))
                    .subject("")
                    .auditory("")
                    .type("")
                    .build(),
                    HttpStatus.OK);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteSchedule(@PathVariable int id) {
        Schedules schedule = schedulesRepository.findById(Long.valueOf(id)).get();

        schedule.setProfessorsByIdProfessor(null);
        schedule.setTypesByIdType(null);
        schedule.setAuditoriesByIdAuditory(null);
        schedule.setTypesByIdType(null);
        schedule.setSubjectsByIdSubject(null);

        schedulesRepository.save(schedule);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable int id, @RequestBody ScheduleResponseWithId newSchedule) {
        if(newSchedule.getSubject().trim().equals("") ||
            newSchedule.getAuditory().trim().equals("") ||
            newSchedule.getType().trim().equals("")) {

            return ResponseEntity.status(400).body("Some data is Null");
        }

        Optional<Auditories> auditoryTemp = auditoriesRepository.findAuditoriesByAuditory(newSchedule.getAuditory());
        Auditories auditory = new Auditories();
        if(auditoryTemp.isEmpty()) {
            auditoriesRepository.save(Auditories.builder()
                                    .auditory(newSchedule.getAuditory())
                                    .build());
            auditory = auditoriesRepository.findAuditoriesByAuditory(newSchedule.getAuditory()).get();
        } else {
            auditory = auditoryTemp.get();
        }


        Optional<Subjects> subjectTemp = subjectsRepository.findSubjectsBySubject(newSchedule.getSubject());
        Subjects subject = new Subjects();
        if(subjectTemp.isEmpty()) {
            subjectsRepository.save(Subjects.builder()
                    .subject(newSchedule.getSubject())
                    .build());
            subject = subjectsRepository.findSubjectsBySubject(newSchedule.getSubject()).get();
        } else {
            subject = subjectTemp.get();
        }

        Types type = typesRepository.findTypesByType(newSchedule.getType()).get();
        Professors professor = professorsRepository.findById(Long.valueOf(newSchedule.getIdProfessor())).get();
        Groups group = groupsRepository.findById(Long.valueOf(newSchedule.getIdGroup())).get();

        Schedules schedule = schedulesRepository.findById(Long.valueOf(id)).get();
        schedule.setProfessorsByIdProfessor(Professors.builder()
                                            .idProfessor(professor.getIdProfessor())
                                            .lastName(professor.getLastName())
                                            .firstName(professor.getFirstName())
                                            .middleName(professor.getMiddleName())
                                            .build());
        schedule.setSubjectsByIdSubject(subject);
        schedule.setAuditoriesByIdAuditory(auditory);
        schedule.setTypesByIdType(type);

        schedulesRepository.save(schedule);

        return new ResponseEntity<SchedulesResponse>(SchedulesResponse.builder()
                        .id(newSchedule.getId())
                        .group(GroupsResponse.builder()
                                .id(group.getIdGroup())
                                .groupName(group.getGroupName())
                                .build())
                        .professor(ProfessorsResponse.builder()
                                .id(professor.getIdProfessor())
                                .lastName(professor.getLastName())
                                .firstName(professor.getFirstName())
                                .middleName(professor.getMiddleName())
                                .build())
                        .numberOfWeek(newSchedule.getNumberOfWeek())
                        .day(newSchedule.getDay())
                        .timeBegin(newSchedule.getTimeBegin())
                        .timeEnd(newSchedule.getTimeEnd())
                        .subject(newSchedule.getSubject())
                        .auditory(newSchedule.getAuditory())
                        .type(newSchedule.getType())
                        .build(),
                HttpStatus.OK);
    }

    @GetMapping("/numberOfWeeks")
    public ResponseEntity<List<NumberOfWeekResponse>> getAllNumberOfWeeks() {
        List<NumberOfWeeks> listNW = numberOfWeeksRepository.findAll(); // Поиск номеров недель в базе

        List<NumberOfWeekResponse> numberOfWeekResponseList = new ArrayList<>();
        listNW.forEach(nw -> {
            NumberOfWeekResponse numberOfWeekResponse = new NumberOfWeekResponse();
            numberOfWeekResponse.setId(nw.getIdNumberOfWeek());
            numberOfWeekResponse.setNumberOfWeek(String.valueOf(nw.getNumberWeek()));

            numberOfWeekResponseList.add(numberOfWeekResponse);
        });

        return new ResponseEntity<List<NumberOfWeekResponse>>(numberOfWeekResponseList, HttpStatus.OK);
    }
}
