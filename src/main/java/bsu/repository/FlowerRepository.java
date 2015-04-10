package bsu.repository;

import bsu.model.hibernate.Flower;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlowerRepository extends JpaRepository<Flower, Long> {

    @Query("select f from Flower f")
    public List<Flower> getFlowerList(Pageable pageable);

    @Query("select count(f) from Flower f")
    public Long getFlowerCountList();
}
