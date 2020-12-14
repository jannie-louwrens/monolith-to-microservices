package me.louwrens.cayambe.category.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "category")
public class Category extends PanacheEntityBase {

    @Id
    @SequenceGenerator(
            name = "categorySequence",
            sequenceName = "category_sequence",
            allocationSize = 1,
            initialValue = 1020
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categorySequence")
    @Column(name = "id", updatable = false, nullable = false)
    public Integer id;

    @NotNull
    @Size(min = 3, max = 50)
    @Column(name = "name", length = 50, nullable = false)
    public String name;

    public String header;

    public Boolean visible;

    @Column(name = "image_path", length = 120)
    public String imagePath;

    public LocalDateTime created;

    public LocalDateTime updated;

    @Version
    public Integer version = 0;

    @Column(name = "parent_id")
    public Integer parent;

    @OrderBy
    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    public Set<Category> children;

}
