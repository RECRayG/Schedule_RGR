package ru.schedule.server.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class ScheduleResponseWithId {
    private int id;
    private String subject;
    private String auditory;
    private String type;
    private String day;
    private String timeBegin;
    private String timeEnd;
    private int numberOfWeek;
    private int idProfessor;
    private int idGroup;
}
