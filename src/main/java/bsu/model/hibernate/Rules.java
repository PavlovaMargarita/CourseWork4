package bsu.model.hibernate;

import javax.persistence.*;

@Entity
@Table(name = "rules")
public class Rules {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "INT unsigned")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flower1_id", nullable = false)
    private Flower flower1;

    @ManyToOne
    @JoinColumn(name = "flower2_id", nullable = false)
    private Flower flower2;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Flower getFlower1() {
        return flower1;
    }

    public void setFlower1(Flower flower1) {
        this.flower1 = flower1;
    }

    public Flower getFlower2() {
        return flower2;
    }

    public void setFlower2(Flower flower2) {
        this.flower2 = flower2;
    }
}
