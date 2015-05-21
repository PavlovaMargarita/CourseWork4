package bsu.repository;

import bsu.model.hibernate.Flower;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlowerRepository extends JpaRepository<Flower, Long> {

    @Query("select f from Flower f where f.style='flower'")
    public List<Flower> getFlowerList(Pageable pageable);

    @Query("select count(f) from Flower f where f.style='flower'")
    public Long getFlowerCountList();

    @Query("select f from Flower f where f.style='bouquet'")
    public List<Flower> getBouquetList(Pageable pageable);

    @Query("select count(f) from Flower f where f.style='bouquet'")
    public Long getBouquetCountList();

    @Query("select f from Flower f where f.id in (:flowerIdList)")
    public List<Flower> getFlowerListById(@Param("flowerIdList")List<Long> flowerIdList);
}
