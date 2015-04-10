package bsu.repository;

import bsu.model.hibernate.OrderElement;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Margarita Pavlova on 10-Apr-15.
 */
public interface OrderElementRepository extends JpaRepository<OrderElement, Long> {
}
