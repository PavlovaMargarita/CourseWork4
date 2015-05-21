package bsu.service.impl;

import bsu.enumProperty.OrderStatusEnum;
import bsu.enumProperty.RoleEnum;
import bsu.model.dto.CustomerInformation;
import bsu.model.dto.LoginDto;
import bsu.model.dto.OrderDto;
import bsu.model.dto.OrderElementDto;
import bsu.model.hibernate.Flower;
import bsu.model.hibernate.Order;
import bsu.model.hibernate.OrderElement;
import bsu.model.hibernate.User;
import bsu.param.SecurityWrapper;
import bsu.repository.FlowerRepository;
import bsu.repository.OrderElementRepository;
import bsu.repository.OrderRepository;
import bsu.repository.UserRepository;
import bsu.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlowerRepository flowerRepository;

    @Autowired
    private OrderElementRepository orderElementRepository;


    @Override
    public List getOrderByManagerId(Long managerId, Integer page, Integer size) {
        User user = userRepository.findOne(managerId);
        Pageable pageable = new PageRequest(page - 1, size);
        List <Order> orderList = new ArrayList<>();
        if(user.getRole() == RoleEnum.ROLE_CONFIRMATION_MANAGER){
             orderList =  orderRepository.getOrderForConfirmationManager(managerId, pageable);
        }
        if(user.getRole() == RoleEnum.ROLE_DELIVER_MANAGER){
            orderList =  orderRepository.getOrderForDeliveryManager(managerId, pageable);
        }
        if(user.getRole() == RoleEnum.ROLE_HANDLER_MANAGER){
            orderList =  orderRepository.getOrderForHandlerManager(managerId, pageable);
        }

        List<OrderDto> result = new ArrayList<>();
        for(Order order : orderList){
            result.add(convertToOrderDto(order));
        }
        return result;
    }

    @Override
    public Long getOrderCountByManagerId(Long managerId) {
        User user = userRepository.findOne(managerId);

        Long count = new Long(0);
        if(user.getRole() == RoleEnum.ROLE_CONFIRMATION_MANAGER){
            count =  orderRepository.getCountOrderForConfirmationManager(managerId);
        }
        if(user.getRole() == RoleEnum.ROLE_DELIVER_MANAGER){
            count =  orderRepository.getCountOrderForDeliveryManager(managerId);
        }
        if(user.getRole() == RoleEnum.ROLE_HANDLER_MANAGER){
            count =  orderRepository.getCountOrderForHandlerManager(managerId);
        }

        return count;
    }

    @Override
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findOne(orderId);
        OrderDto orderDto = convertToOrderDto(order);
        return orderDto;
    }

    @Override
    public void managerOrderUpdate(Long orderId, OrderStatusEnum status) {
        Order order = orderRepository.findOne(orderId);
        if(order.getStatus() != status){
            order.setStatus(status);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            List authority = (List)authentication.getAuthorities();
            String stringRole = ((GrantedAuthority)authority.get(0)).getAuthority();
            RoleEnum role = RoleEnum.valueOf(stringRole);
            User user = userRepository.findOne(SecurityWrapper.getCurrentUserId());
            if(role == RoleEnum.ROLE_CONFIRMATION_MANAGER){
                order.setConfirmationManager(user);;
            }
            if(role == RoleEnum.ROLE_HANDLER_MANAGER){
                order.setHandlerManager(user);;
            }
            if(role == RoleEnum.ROLE_DELIVER_MANAGER){
                order.setDeliveryManager(user);
            }
            orderRepository.save(order);
        }
    }

    @Override
    public List<OrderDto> getOrderByUserId(Long userId, Integer page, Integer size) {
        Pageable pageable = new PageRequest(page - 1, size);
        List<Order> orderList = orderRepository.getOrderForUser(userId, pageable);
        List<OrderDto> result = new ArrayList<>();
        for(Order order : orderList){
            result.add(convertToOrderDto(order));
        }
        return result;
    }

    @Override
    public Long getOrderCountByUserId(Long userId) {
        Long count = orderRepository.getCountOrderForUser(userId);
        return count;
    }

    @Override
    public void createOrder(OrderDto orderDto) {
        Order order = new Order();
        User currentUser = userRepository.findOne(SecurityWrapper.getCurrentUserId());
        order.setCustomer(currentUser);
        order.setStatus(OrderStatusEnum.NEW);
        order.setDate(new java.sql.Date((new Date()).getTime()));
        order = orderRepository.save(order);
        for(OrderElementDto orderElementDto : orderDto.getFlowerList1()){
            OrderElement orderElement = new OrderElement();
            orderElement.setCount(orderElementDto.getCount());
            Flower flower = flowerRepository.findOne(orderElementDto.getFlowerId());
            orderElement.setFlower(flower);
            orderElement.setOrder1(order);
            orderElementRepository.save(orderElement);
        }

        for(OrderElementDto orderElementDto : orderDto.getFlowerList2()){
            OrderElement orderElement = new OrderElement();
            orderElement.setCount(orderElementDto.getCount());
            Flower flower = flowerRepository.findOne(orderElementDto.getFlowerId());
            orderElement.setFlower(flower);
            orderElement.setOrder2(order);
            orderElementRepository.save(orderElement);
        }

        for(OrderElementDto orderElementDto : orderDto.getFlowerList3()){
            OrderElement orderElement = new OrderElement();
            orderElement.setCount(orderElementDto.getCount());
            Flower flower = flowerRepository.findOne(orderElementDto.getFlowerId());
            orderElement.setFlower(flower);
            orderElement.setOrder3(order);
            orderElementRepository.save(orderElement);
        }

    }

    private OrderDto convertToOrderDto(Order order){
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
//        orderDto.setConfirmationManager(order.getConfirmationManager().getFirstName() + " " + order.getConfirmationManager().getLastName());
        orderDto.setCustomer(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName());
        orderDto.setDate(order.getDate());
//        orderDto.setDeliveryManager(order.getDeliveryManager().getFirstName() + " " + order.getDeliveryManager().getLastName());
        List<OrderElement> orderElements1 = order.getFlowerList1();
        List<OrderElementDto> orderElementDtoList1 = new ArrayList<>();
        for(OrderElement orderElement : orderElements1){
            orderElementDtoList1.add(convertToOrderElementDto(orderElement));
        }
        orderDto.setFlowerList1(orderElementDtoList1);

        List<OrderElement> orderElements2 = order.getFlowerList2();
        List<OrderElementDto> orderElementDtoList2 = new ArrayList<>();
        for(OrderElement orderElement : orderElements2){
            orderElementDtoList2.add(convertToOrderElementDto(orderElement));
        }
        orderDto.setFlowerList2(orderElementDtoList2);

        List<OrderElement> orderElements3 = order.getFlowerList3();
        List<OrderElementDto> orderElementDtoList3 = new ArrayList<>();
        for(OrderElement orderElement : orderElements3){
            orderElementDtoList3.add(convertToOrderElementDto(orderElement));
        }
        orderDto.setFlowerList3(orderElementDtoList3);
//        orderDto.setHandlerManager(order.getHandlerManager().getFirstName() + " " + order.getHandlerManager().getLastName());
        orderDto.setStatus(order.getStatus());

        CustomerInformation customerInformation = new CustomerInformation();
        customerInformation.setCity(order.getCustomer().getCity());
        customerInformation.setStreet(order.getCustomer().getStreet());
        customerInformation.setHouse(order.getCustomer().getHouse());
        customerInformation.setFlat(order.getCustomer().getFlat());
        customerInformation.setPhone(order.getCustomer().getPhone());

        orderDto.setCustomerInformation(customerInformation);
        return orderDto;
    }

    private OrderElementDto convertToOrderElementDto(OrderElement orderElement){
        OrderElementDto orderElementDto = new OrderElementDto();
        orderElementDto.setFlowerName(orderElement.getFlower().getName());
        orderElementDto.setCount(orderElement.getCount());
        orderElementDto.setFlowerDescription(orderElement.getFlower().getDescription());
        return orderElementDto;
    }


}
