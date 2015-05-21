package bsu.service.impl;

import bsu.model.dto.FlowerDto;
import bsu.model.hibernate.Flower;
import bsu.repository.FlowerRepository;
import bsu.service.FlowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlowerServiceImpl implements FlowerService {

    @Autowired
    private FlowerRepository flowerRepository;

    @Override
    public List<FlowerDto> getFlowerList(Integer page, Integer size) {
        Pageable pageable = new PageRequest(page - 1, size);
        List<Flower> flowerList = flowerRepository.getFlowerList(pageable);
        List<FlowerDto> flowerDtoList = new ArrayList<>();
        for(Flower flower : flowerList){
            flowerDtoList.add(convertToFlowerDto(flower));
        }
        return flowerDtoList;
    }

    @Override
    public Long getFlowerCountList() {
        Long count = flowerRepository.getFlowerCountList();
        return count;
    }

    @Override
    public List<FlowerDto> getBouquetList(Integer page, Integer size) {
        Pageable pageable = new PageRequest(page - 1, size);
        List<Flower> flowerList = flowerRepository.getBouquetList(pageable);
        List<FlowerDto> flowerDtoList = new ArrayList<>();
        for(Flower flower : flowerList){
            flowerDtoList.add(convertToFlowerDto(flower));
        }
        return flowerDtoList;
    }

    @Override
    public Long getBouquetCountList() {
        Long count = flowerRepository.getBouquetCountList();
        return count;
    }

    @Override
    public List<FlowerDto> getFlowerListById(List<Long> flowerIdList) {
        List<Flower> flowerList = flowerRepository.getFlowerListById(flowerIdList);
        List<FlowerDto> flowerDtoList = new ArrayList<>();
        for(Flower flower : flowerList){
            flowerDtoList.add(convertToFlowerDto(flower));
        }
        return flowerDtoList;
    }

    private FlowerDto convertToFlowerDto(Flower flower){
        FlowerDto flowerDto = new FlowerDto();
        flowerDto.setId(flower.getId());
        flowerDto.setDescription(flower.getDescription());
        flowerDto.setCost(flower.getCost());
        flowerDto.setPicture(flower.getPicture());
        flowerDto.setStyle(flower.getStyle());
        flowerDto.setName(flower.getName());
        return flowerDto;
    }
}
