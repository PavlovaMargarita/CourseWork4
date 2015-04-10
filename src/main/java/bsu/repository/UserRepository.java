package bsu.repository;

import bsu.enumProperty.RoleEnum;
import bsu.model.hibernate.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.management.relation.RoleInfo;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User readUser(@Param("username") String username);

    @Query("SELECT u FROM User u where u.role=:role")
    public List<User> getUserList(@Param("role")RoleEnum role, org.springframework.data.domain.Pageable pageable);

    @Query("SELECT count(u) FROM User u where u.role=:role")
    public Integer getUserCount(@Param("role")RoleEnum role);
}
