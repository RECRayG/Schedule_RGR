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
public class Professors {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_professor")
    private int idProfessor;

    @Basic
    @Column(name = "last_name")
    private String lastName;

    @Basic
    @Column(name = "first_name")
    private String firstName;

    @Basic
    @Column(name = "middle_name")
    private String middleName;

    @OneToMany(mappedBy = "professorsByIdProfessor", cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH, CascadeType.PERSIST}, orphanRemoval = false)
    private Collection<Schedules> schedulesByIdProfessor;
}