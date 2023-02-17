package ru.schedule.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.schedule.server.dto.ProfessorsResponse;
import ru.schedule.server.model.Professors;
import ru.schedule.server.model.Schedules;
import ru.schedule.server.repository.ProfessorsRepository;
import ru.schedule.server.repository.SchedulesRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin("*")//origins = {"http://localhost:3000/"}) // Для доступности порта 8080 (сервер) для 3000 (клиент), либо всем ("*")
@RestController
@RequestMapping("/api/professors")
public class ProfessorsController {
    @Autowired
    private ProfessorsRepository professorsRepository;

    @Autowired
    private SchedulesRepository schedulesRepository;

    @GetMapping
    public ResponseEntity<List<ProfessorsResponse>> getAllProfessors() {
        List<Professors> listProf = professorsRepository.findAll(); // Поиск профессоров из базы

        List<ProfessorsResponse> professorsResponseList = new ArrayList<>();
        listProf.forEach(professor -> {
            ProfessorsResponse professorsResponse = new ProfessorsResponse();

            professorsResponse.setId(professor.getIdProfessor());
            professorsResponse.setLastName(professor.getLastName());
            professorsResponse.setFirstName(professor.getFirstName());
            professorsResponse.setMiddleName(professor.getMiddleName());

            professorsResponseList.add(professorsResponse);
        });

        return new ResponseEntity<List<ProfessorsResponse>>(professorsResponseList, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProfessorsResponse> getProfessorById(@PathVariable int id) {
        Professors professor = professorsRepository.findById(Long.valueOf(id)).get(); // Поиск профессоров из базы

        return new ResponseEntity<ProfessorsResponse>(ProfessorsResponse.builder()
                                                    .id(professor.getIdProfessor())
                                                    .lastName(professor.getLastName())
                                                    .firstName(professor.getFirstName())
                                                    .middleName(professor.getMiddleName())
                                                    .build(),
                                                    HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProfessor(@RequestBody ProfessorsResponse insertProfessor) {
        if(insertProfessor.getLastName().trim().equals("") || insertProfessor.getFirstName().trim().equals("")) {
            return ResponseEntity.status(400).body("LastName or FirstName are Null");
        }

        var professor = Professors.builder().build();

        if(insertProfessor.getMiddleName().equals("")) {
            professor = Professors.builder()
                    .lastName(insertProfessor.getLastName())
                    .firstName(insertProfessor.getFirstName())
                    .build();
        } else {
            professor = Professors.builder()
                    .lastName(insertProfessor.getLastName())
                    .firstName(insertProfessor.getFirstName())
                    .middleName(insertProfessor.getMiddleName())
                    .build();
        }

        professorsRepository.save(professor);

        return new ResponseEntity<ProfessorsResponse>(ProfessorsResponse.builder()
                                                    .lastName(professor.getLastName())
                                                    .firstName(professor.getFirstName())
                                                    .middleName(professor.getMiddleName())
                                                    .build(),
                                                    HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfessor(@PathVariable int id, @RequestBody ProfessorsResponse newProfessor) {
        if(newProfessor.getLastName().trim().equals("") || newProfessor.getFirstName().trim().equals("")) {
            return ResponseEntity.status(400).body("LastName or FirstName are Null");
        }

        Professors professor = professorsRepository.findById(Long.valueOf(id)).get();

        professor.setFirstName(newProfessor.getFirstName());
        professor.setLastName(newProfessor.getLastName());
        professor.setMiddleName(newProfessor.getMiddleName());

        professorsRepository.save(professor);

        return new ResponseEntity<ProfessorsResponse>(ProfessorsResponse.builder()
                                                    .id(professor.getIdProfessor())
                                                    .lastName(professor.getLastName())
                                                    .firstName(professor.getFirstName())
                                                    .middleName(professor.getMiddleName())
                                                    .build(),
                                                    HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteProfessor(@PathVariable int id) {
        Professors professor = professorsRepository.findById(Long.valueOf(id)).get(); // Поиск профессора по id

        // При удалении профессора обнуляются соответствующие позиции в расписании (приявзка к группе остаётся)
        if(!professor.getSchedulesByIdProfessor().isEmpty()) {
            professor.getSchedulesByIdProfessor().forEach(sch -> {
                Schedules schedule = schedulesRepository.findById(Long.valueOf(sch.getIdSchedule())).get();
                schedule.setProfessorsByIdProfessor(null);
                schedule.setTypesByIdType(null);
                schedule.setAuditoriesByIdAuditory(null);
                schedule.setTypesByIdType(null);
                schedule.setSubjectsByIdSubject(null);

                schedulesRepository.save(schedule);
            });
        }

        professorsRepository.delete(professor);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
