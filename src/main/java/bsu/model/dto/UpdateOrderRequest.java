package bsu.model.dto;

import bsu.enumProperty.OrderStatusEnum;

public class UpdateOrderRequest {
    private Long orderId;
    private OrderStatusEnum status;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public OrderStatusEnum getStatus() {
        return status;
    }

    public void setStatus(OrderStatusEnum status) {
        this.status = status;
    }
}
