package bsu.controller;

import bsu.model.dto.OrderDto;
import bsu.model.dto.UpdateOrderRequest;
import bsu.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(method = RequestMethod.GET, value = "/orderByRole")
    @ResponseBody
    public List<OrderDto> getOrderByRole(@RequestParam("managerId") Long managerId,
                                         @RequestParam("page") Integer page,
                                         @RequestParam("size") Integer size){
        List<OrderDto> result = orderService.getOrderByManagerId(managerId, page, size);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/orderCount")
    @ResponseBody
    public Long getOrderCountByRole(@RequestParam("managerId") Long managerId){
        Long count = orderService.getOrderCountByManagerId(managerId);
        return count;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/orderById")
    @ResponseBody
    public OrderDto getOrderById(@RequestParam("orderId") Long orderId){
        OrderDto orderDto = orderService.getOrderById(orderId);
        return orderDto;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/managerOrderUpdate")
    @ResponseBody
    public void managerOrderUpdate(@RequestBody UpdateOrderRequest updateOrderRequest){
        orderService.managerOrderUpdate(updateOrderRequest.getOrderId(), updateOrderRequest.getStatus());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/orderByUser")
    @ResponseBody
    public List<OrderDto> getOrderByUserId(@RequestParam("userId") Long userId,
                                 @RequestParam("page") Integer page,
                                 @RequestParam("size") Integer size){
        List<OrderDto> result = orderService.getOrderByUserId(userId, page, size);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/userOrderCount")
    @ResponseBody
    public Long getOrderCountByUserId(@RequestParam("userId") Long userId){
        Long count = orderService.getOrderCountByUserId(userId);
        return count;
    }
}
