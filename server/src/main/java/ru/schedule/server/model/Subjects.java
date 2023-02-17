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
public class Subjects {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_subject")
    private int idSubject;

    @Basic
    @Column(name = "subject")
    private String subject;

    @OneToMany(mappedBy = "subjectsByIdSubject", cascade = CascadeType.ALL, orphanRemoval = false)
    private Collection<Schedules> schedulesByIdSubject;
}
