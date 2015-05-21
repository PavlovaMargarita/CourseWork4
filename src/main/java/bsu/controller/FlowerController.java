package bsu.controller;

import bsu.model.dto.FlowerDto;
import bsu.model.dto.OrderDto;
import bsu.service.FlowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Controller
@RequestMapping("/flower")
public class FlowerController {

    @Autowired
    private FlowerService flowerService;

    @RequestMapping(method = RequestMethod.GET, value = "/flowerList")
    @ResponseBody
    public List<FlowerDto> getFlowerList(@RequestParam("page") Integer page,
                                         @RequestParam("size") Integer size){
        List<FlowerDto> result = flowerService.getFlowerList(page, size);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/flowerCountList")
    @ResponseBody
    public Long getFlowerCountList(){
        Long count = flowerService.getFlowerCountList();
        return count;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/bouquetList")
    @ResponseBody
    public List<FlowerDto> getBouquetList(@RequestParam("page") Integer page,
                                         @RequestParam("size") Integer size){
        List<FlowerDto> result = flowerService.getBouquetList(page, size);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/bouquetCountList")
    @ResponseBody
    public Long getBouquetCountList(){
        Long count = flowerService.getBouquetCountList();
        return count;
    }


    @RequestMapping(method = RequestMethod.GET, value = "/flowerListById")
    @ResponseBody
    public List<FlowerDto> getFlowerListById(@RequestParam("flowerIdList") List<String> flowerIdList){
        List<Long> list = new ArrayList<>(flowerIdList.size());
        for(String str : flowerIdList){
            list.add(Long.valueOf(str));
        }
        List<FlowerDto> result = flowerService.getFlowerListById(list);
        return result;
    }

}
