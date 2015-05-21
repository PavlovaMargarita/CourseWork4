package bsu.controller;

import bsu.model.dto.FlowerDto;
import bsu.model.dto.RulesDto;
import bsu.service.RulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/rules")
public class RulesController {

    @Autowired
    private RulesService rulesService;

    @RequestMapping(method = RequestMethod.GET, value = "/rulesList")
    @ResponseBody
    public List<RulesDto> getRulesList(){
        List<RulesDto> result = rulesService.getAll();
        return result;
    }
}
