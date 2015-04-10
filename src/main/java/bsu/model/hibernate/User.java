package bsu.model.hibernate;

import bsu.enumProperty.RoleEnum;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "INT unsigned")
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private Integer house;

    @Column(nullable = false)
    private String flat;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleEnum role;


    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Order> orderListCustomer;

    @OneToMany(mappedBy = "confirmationManager", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Order> orderListConfirmationManager;

    @OneToMany(mappedBy = "handlerManager", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Order> orderListHandlerManager;

    @OneToMany(mappedBy = "deliveryManager", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Order> orderListDeliveryManager;

    public User(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getHouse() {
        return house;
    }

    public void setHouse(Integer house) {
        this.house = house;
    }

    public String getFlat() {
        return flat;
    }

    public void setFlat(String flat) {
        this.flat = flat;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public List<Order> getOrderListCustomer() {
        return orderListCustomer;
    }

    public void setOrderListCustomer(List<Order> orderListCustomer) {
        this.orderListCustomer = orderListCustomer;
    }

    public List<Order> getOrderListHandlerManager() {
        return orderListHandlerManager;
    }

    public void setOrderListHandlerManager(List<Order> orderListHandlerManager) {
        this.orderListHandlerManager = orderListHandlerManager;
    }

    public List<Order> getOrderListDeliveryManager() {
        return orderListDeliveryManager;
    }

    public void setOrderListDeliveryManager(List<Order> orderListDeliveryManager) {
        this.orderListDeliveryManager = orderListDeliveryManager;
    }

    public List<Order> getOrderListConfirmationManager() {
        return orderListConfirmationManager;
    }

    public void setOrderListConfirmationManager(List<Order> orderListConfirmationManager) {
        this.orderListConfirmationManager = orderListConfirmationManager;
    }
}
