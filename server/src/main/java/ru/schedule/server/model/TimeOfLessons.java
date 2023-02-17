package ru.schedule.server.model;

import jakarta.persistence.*;

import java.time.LocalTime;
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
@Table(name = "time_of_lessons", schema = "public", catalog = "group_schedule")
public class TimeOfLessons {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_time_of_lesson")
    private int idTimeOfLesson;

    @Basic
    @Column(name = "time_lesson")
    private LocalTime timeLesson;

    @OneToMany(mappedBy = "timeOfLessonsByIdBegin", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Times> timesByIdTimeOfLesson;

    @OneToMany(mappedBy = "timeOfLessonsByIdEnd", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Times> timesByIdTimeOfLesson_0;
}
