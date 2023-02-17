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
public class ProfessorsResponse {
    private int id;
    private String firstName;
    private String lastName;
    private String middleName;
}
