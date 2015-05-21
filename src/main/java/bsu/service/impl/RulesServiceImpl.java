package bsu.service.impl;

import bsu.model.dto.RulesDto;
import bsu.model.hibernate.Rules;
import bsu.repository.RulesRepository;
import bsu.service.RulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RulesServiceImpl implements RulesService {
    @Autowired
    private RulesRepository rulesRepository;

    @Override
    public List<RulesDto> getAll() {
        List<Rules> rulesList = rulesRepository.findAll();
        List<RulesDto> result = new ArrayList<>();
        for(Rules rules : rulesList){
            result.add(convertRulesToRulesDto(rules));
        }
        return result;
    }

    private RulesDto convertRulesToRulesDto(Rules rules){
        RulesDto rulesDto = new RulesDto();
        rulesDto.setFlower1Id(rules.getFlower1().getId());
        rulesDto.setFlower1Name(rules.getFlower1().getName());
        rulesDto.setFlower2Id(rules.getFlower2().getId());
        rulesDto.setFlower2Name(rules.getFlower2().getName());
        return rulesDto;
    }
}

