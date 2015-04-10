package bsu.repository;

import bsu.enumProperty.OrderStatusEnum;
import bsu.enumProperty.RoleEnum;
import bsu.model.hibernate.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by Margarita Pavlova on 09-Apr-15.
 */
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select o from Order o where (o.confirmationManager.id=:managerId and o.status='IN_CONFIRMATION')or o.status='NEW'")
    public List<Order> getOrderForConfirmationManager(@Param("managerId") Long managerId, Pageable pageable);

    @Query("select o from Order o where (o.handlerManager.id=:managerId and o.status='IN_PROCESSING') or o.status='READY_FOR_PROCESSING'")
    public List<Order> getOrderForHandlerManager(@Param("managerId") Long managerId, Pageable pageable);

    @Query("select o from Order o where (o.deliveryManager.id=:managerId and o.status='SHIPPING')or o.status='READY_FOR_SHIPPING'")
    public List<Order> getOrderForDeliveryManager(@Param("managerId") Long managerId, Pageable pageable);

    @Query("select count(o) from Order o where (o.confirmationManager.id=:managerId and o.status='IN_CONFIRMATION')or o.status='NEW'")
    public Long getCountOrderForConfirmationManager(@Param("managerId") Long managerId);

    @Query("select count(o) from Order o where (o.handlerManager.id=:managerId and o.status='IN_PROCESSING') or o.status='READY_FOR_PROCESSING'")
    public Long getCountOrderForHandlerManager(@Param("managerId") Long managerId);

    @Query("select count(o) from Order o where (o.deliveryManager.id=:managerId and o.status='SHIPPING')or o.status='READY_FOR_SHIPPING'")
    public Long getCountOrderForDeliveryManager(@Param("managerId") Long managerId);

    @Query("select o from Order o where o.customer.id=:userId")
    public List<Order> getOrderForUser(@Param("userId") Long userId, Pageable pageable);

    @Query("select count(o) from Order o where o.customer.id=:userId")
    public Long getCountOrderForUser(@Param("userId") Long userId);


}
