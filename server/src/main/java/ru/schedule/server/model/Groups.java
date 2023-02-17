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
public class Groups {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_group")
    private int idGroup;

    @Basic
    @Column(name = "group_name")
    private String groupName;

    @OneToMany(mappedBy = "groupsByIdGroup", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
    private Collection<GrSchIdentity> grSchIdentitiesByIdGroup;
}
