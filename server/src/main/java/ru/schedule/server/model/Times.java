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
public class Times {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_time")
    private int idTime;

    @OneToMany(mappedBy = "timesByIdTime", cascade = CascadeType.ALL, orphanRemoval = false)
    private Collection<GrSchIdentity> grSchIdentitiesByIdTime;

    @ManyToOne
    @JoinColumn(name = "id_day", referencedColumnName = "id_day", nullable = false)
    private Days daysByIdDay;

    @ManyToOne
    @JoinColumn(name = "id_begin", referencedColumnName = "id_time_of_lesson", nullable = false)
    private TimeOfLessons timeOfLessonsByIdBegin;

    @ManyToOne
    @JoinColumn(name = "id_end", referencedColumnName = "id_time_of_lesson", nullable = false)
    private TimeOfLessons timeOfLessonsByIdEnd;
}
