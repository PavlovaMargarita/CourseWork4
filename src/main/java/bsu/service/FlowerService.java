package bsu.service;

import bsu.model.dto.FlowerDto;

import java.util.List;

public interface FlowerService {
    public List<FlowerDto> getFlowerList(Integer page, Integer size);
    public Long getFlowerCountList();
    public List<FlowerDto> getBouquetList(Integer page, Integer size);
    public Long getBouquetCountList();
    public List<FlowerDto> getFlowerListById(List<Long> flowerIdList);
}
