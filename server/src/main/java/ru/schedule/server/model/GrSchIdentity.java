package ru.schedule.server.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
@Entity
@Table(name = "gr_sch_identity", schema = "public", catalog = "group_schedule")
public class GrSchIdentity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_gr_sch_identity")
    private int idGrSchIdentity;

    @ManyToOne
    @JoinColumn(name = "id_group", referencedColumnName = "id_group", nullable = false)
    private Groups groupsByIdGroup;

    @ManyToOne
    @JoinColumn(name = "id_schedule", referencedColumnName = "id_schedule", nullable = false)
    private Schedules schedulesByIdSchedule;

    @ManyToOne
    @JoinColumn(name = "id_number_of_week", referencedColumnName = "id_number_of_week", nullable = false)
    private NumberOfWeeks numberOfWeeksByIdNumberOfWeek;

    @ManyToOne
    @JoinColumn(name = "id_time", referencedColumnName = "id_time", nullable = false)
    private Times timesByIdTime;
}
