package ru.schedule.server.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
@Entity
public class Types {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_type")
    private int idType;

    @Basic
    @Column(name = "type")
    private String type;

    @OneToMany(mappedBy = "typesByIdType", cascade = CascadeType.ALL, orphanRemoval = false)
    private Collection<Schedules> schedulesByIdType;
}
