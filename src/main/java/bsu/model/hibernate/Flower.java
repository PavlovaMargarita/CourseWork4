package bsu.model.hibernate;

import javax.persistence.*;
import java.util.*;
/**
 * Created by Margarita on 23.11.2014.
 */
@Entity
@Table(name="flower")
public class Flower {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "INT unsigned")
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer cost;

    @Column(nullable = false)
    private String picture;

    public Flower(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
