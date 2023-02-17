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
public class GroupsResponse {
    private int id;
    private String groupName;
}
