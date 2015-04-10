package bsu.model.hibernate;

import javax.persistence.*;

@Entity
@Table(name="order_element")
public class OrderElement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "INT unsigned")
    private Long id;

    @OneToOne
    @JoinColumn(name = "flower_id", nullable = false)
    private Flower flower;

    @Column(name="count")
    private Integer count;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Flower getFlower() {
        return flower;
    }

    public void setFlower(Flower flower) {
        this.flower = flower;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
