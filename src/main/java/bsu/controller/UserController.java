package bsu.controller;

import bsu.model.dto.LoginDto;
import bsu.enumProperty.RoleEnum;
import bsu.model.dto.UserDto;
import bsu.param.SecurityWrapper;
import bsu.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, value = "/userInfo")
    @ResponseBody
    public LoginDto currentUserInfo(){
        Logger.getLogger(UserController.class).info("Request: /EmployeeService/user/userInfo");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List authority = (List)authentication.getAuthorities();
        String stringRole = ((GrantedAuthority)authority.get(0)).getAuthority();
        String username = authentication.getName();
        return new LoginDto(RoleEnum.valueOf(stringRole), username, SecurityWrapper.getCurrentUserId());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/userList")
    @ResponseBody
    public List<UserDto> getUserList(@RequestParam("page") Integer page,
                                         @RequestParam("size") Integer size){
        List<UserDto> result = userService.getUserList(page, size);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/userCount")
    @ResponseBody
    public Integer getUserCount(){
        Integer result = userService.getUserCount();
        return result;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/userCreateOrUpdate")
    @ResponseBody
    public void userCreateOrUpdate(@RequestBody UserDto userDto){
        userService.createOrUpdateUser(userDto);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/userById")
    @ResponseBody
    public UserDto getUserById(@RequestParam("userId") Long userId){
        UserDto result = userService.getUserById(userId);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/verifyUser")
    @ResponseBody
    public Integer verifyUser(@RequestParam("phone") String phone){
        return userService.verifyUser(phone);
    }

}
