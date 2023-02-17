package ru.schedule.server.model;

import jakarta.persistence.*;

import java.util.Collection;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
@Entity
public class Schedules {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_schedule")
    private int idSchedule;

    @OneToMany(mappedBy = "schedulesByIdSchedule", cascade = CascadeType.ALL, orphanRemoval = false)
    private Collection<GrSchIdentity> grSchIdentitiesByIdSchedule;

    @ManyToOne
    @JoinColumn(name = "id_professor", referencedColumnName = "id_professor")
    private Professors professorsByIdProfessor;

    @ManyToOne
    @JoinColumn(name = "id_subject", referencedColumnName = "id_subject")
    private Subjects subjectsByIdSubject;

    @ManyToOne
    @JoinColumn(name = "id_auditory", referencedColumnName = "id_auditory")
    private Auditories auditoriesByIdAuditory;

    @ManyToOne
    @JoinColumn(name = "id_type", referencedColumnName = "id_type")
    private Types typesByIdType;
}
