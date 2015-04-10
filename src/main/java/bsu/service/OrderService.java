package bsu.service;

import bsu.enumProperty.OrderStatusEnum;
import bsu.enumProperty.RoleEnum;
import bsu.model.dto.OrderDto;

import java.util.List;

public interface OrderService {
    public List getOrderByManagerId(Long managerId, Integer page, Integer size);
    public Long getOrderCountByManagerId(Long managerId);
    public OrderDto getOrderById(Long orderId);
    public void managerOrderUpdate(Long orderId, OrderStatusEnum status);
    public List getOrderByUserId(Long userId, Integer page, Integer size);
    public Long getOrderCountByUserId(Long userId);
}
