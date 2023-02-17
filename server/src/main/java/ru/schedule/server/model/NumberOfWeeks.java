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
@Table(name = "number_of_weeks", schema = "public", catalog = "group_schedule")
public class NumberOfWeeks {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_number_of_week")
    private int idNumberOfWeek;

    @Basic
    @Column(name = "number_week")
    private int numberWeek;

    @OneToMany(mappedBy = "numberOfWeeksByIdNumberOfWeek", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
    private Collection<GrSchIdentity> grSchIdentitiesByIdNumberOfWeek;
}
