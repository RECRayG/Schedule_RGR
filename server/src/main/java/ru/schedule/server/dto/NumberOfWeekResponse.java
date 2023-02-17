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
public class NumberOfWeekResponse {
    private int id;
    private String numberOfWeek;
}
