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
    @JoinColumn(name = "order1_id", nullable = true)
    private Order order1;

    @ManyToOne
    @JoinColumn(name = "order2_id", nullable = true)
    private Order order2;

    @ManyToOne
    @JoinColumn(name = "order3_id", nullable = true)
    private Order order3;

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

    public Order getOrder1() {
        return order1;
    }

    public void setOrder1(Order order1) {
        this.order1 = order1;
    }

    public Order getOrder2() {
        return order2;
    }

    public void setOrder2(Order order2) {
        this.order2 = order2;
    }

    public Order getOrder3() {
        return order3;
    }

    public void setOrder3(Order order3) {
        this.order3 = order3;
    }
}
