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
public class SchedulesResponse {
    private int id;
    private String subject;
    private String auditory;
    private String type;
    private String day;
    private String timeBegin;
    private String timeEnd;
    private int numberOfWeek;
    private ProfessorsResponse professor;
    private GroupsResponse group;
}
