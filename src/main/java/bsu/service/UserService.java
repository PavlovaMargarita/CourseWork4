package bsu.service;

import bsu.model.dto.UserDto;

import java.util.List;

/**
 * Created by Margarita Pavlova on 09-Apr-15.
 */
public interface UserService {
    public List<UserDto> getUserList(Integer page, Integer size);
    public Integer getUserCount();
    public void createOrUpdateUser(UserDto userDto);
    public UserDto getUserById(Long userId);
}
