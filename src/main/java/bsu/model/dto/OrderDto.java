package bsu.model.dto;

import bsu.enumProperty.OrderStatusEnum;
import bsu.enumProperty.RoleEnum;
import bsu.model.hibernate.OrderElement;
import bsu.model.hibernate.User;

import java.sql.Date;
import java.util.List;

public class OrderDto {
    private Long id;
    private OrderStatusEnum status;
    private String customer;
    private String confirmationManager;
    private String handlerManager;
    private String deliveryManager;
    private Date date;
    private List<OrderElementDto> flowerList;
    private CustomerInformation customerInformation;

    public OrderDto(){
        customerInformation = new CustomerInformation();
    }

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

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getConfirmationManager() {
        return confirmationManager;
    }

    public void setConfirmationManager(String confirmationManager) {
        this.confirmationManager = confirmationManager;
    }

    public String getHandlerManager() {
        return handlerManager;
    }

    public void setHandlerManager(String handlerManager) {
        this.handlerManager = handlerManager;
    }

    public String getDeliveryManager() {
        return deliveryManager;
    }

    public void setDeliveryManager(String deliveryManager) {
        this.deliveryManager = deliveryManager;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<OrderElementDto> getFlowerList() {
        return flowerList;
    }

    public void setFlowerList(List<OrderElementDto> flowerList) {
        this.flowerList = flowerList;
    }

    public CustomerInformation getCustomerInformation() {
        return customerInformation;
    }

    public void setCustomerInformation(CustomerInformation customerInformation) {
        this.customerInformation = customerInformation;
    }
}
