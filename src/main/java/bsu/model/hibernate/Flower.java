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
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer cost;

    @Column(nullable = false)
    private String picture;

    @OneToMany(mappedBy = "flower1", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Rules> flower1List;

    @OneToMany(mappedBy = "flower2", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Rules> flower2List;

    @Column(nullable = false)
    private String style;

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

    public List<Rules> getFlower1List() {
        return flower1List;
    }

    public void setFlower1List(List<Rules> flower1List) {
        this.flower1List = flower1List;
    }

    public List<Rules> getFlower2List() {
        return flower2List;
    }

    public void setFlower2List(List<Rules> flower2List) {
        this.flower2List = flower2List;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
