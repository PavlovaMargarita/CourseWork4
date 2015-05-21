package bsu.model.hibernate;

import bsu.enumProperty.OrderStatusEnum;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "order_description")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "INT unsigned")
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatusEnum status;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "confirmation_manager_id", nullable = true)
    private User confirmationManager;

    @ManyToOne
    @JoinColumn(name = "handler_manager_id", nullable = true)
    private User handlerManager;

    @ManyToOne
    @JoinColumn(name = "delivery_manager_id", nullable = true)
    private User deliveryManager;

    @Column(nullable = false)
    private Date date;

//    @ManyToMany
//    @JoinTable(name = "order_flower", joinColumns = {
//            @JoinColumn(name = "order_id", nullable = false, updatable = false) },
//            inverseJoinColumns = { @JoinColumn(name = "flower_id",
//                    nullable = false, updatable = false) })
//    private List<Flower> flowerList;

    @OneToMany(mappedBy = "order1", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<OrderElement> flowerList1;

    @OneToMany(mappedBy = "order2", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<OrderElement> flowerList2;

    @OneToMany(mappedBy = "order3", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<OrderElement> flowerList3;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderStatusEnum getStatus() {
        return status;
    }

    public void setStatus(OrderStatusEnum status) {
        this.status = status;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public User getHandlerManager() {
        return handlerManager;
    }

    public void setHandlerManager(User handlerManager) {
        this.handlerManager = handlerManager;
    }

    public User getDeliveryManager() {
        return deliveryManager;
    }

    public void setDeliveryManager(User deliveryManager) {
        this.deliveryManager = deliveryManager;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<OrderElement> getFlowerList1() {
        return flowerList1;
    }

    public void setFlowerList1(List<OrderElement> flowerList1) {
        this.flowerList1 = flowerList1;
    }

    public List<OrderElement> getFlowerList2() {
        return flowerList2;
    }

    public void setFlowerList2(List<OrderElement> flowerList2) {
        this.flowerList2 = flowerList2;
    }

    public List<OrderElement> getFlowerList3() {
        return flowerList3;
    }

    public void setFlowerList3(List<OrderElement> flowerList3) {
        this.flowerList3 = flowerList3;
    }

    public User getConfirmationManager() {
        return confirmationManager;
    }

    public void setConfirmationManager(User confirmationManager) {
        this.confirmationManager = confirmationManager;
    }
}
