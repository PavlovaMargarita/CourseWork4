package bsu.service.impl;

import bsu.enumProperty.RoleEnum;
import bsu.model.dto.UserDto;
import bsu.model.hibernate.User;
import bsu.repository.UserRepository;
import bsu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDto> getUserList(Integer page, Integer size) {
        Pageable pageable = new PageRequest(page - 1, size);
        List<User> userList = userRepository.getUserList(RoleEnum.ROLE_USER, pageable);
        List<UserDto> userDtoList = new ArrayList<>();
        for(User user : userList){
            userDtoList.add(convertToUserDto(user));
        }
        return userDtoList;
    }

    @Override
    public Integer getUserCount() {
        Integer count = userRepository.getUserCount(RoleEnum.ROLE_USER);
        return count;
    }

    @Override
    public void createOrUpdateUser(UserDto userDto) {
        User user = convertToUser(userDto);
        userRepository.save(user);
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findOne(userId);
        UserDto userDto = convertToUserDto(user);
        return userDto;
    }

    private UserDto convertToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setCity(user.getCity());
        userDto.setStreet(user.getStreet());
        userDto.setHouse(user.getHouse());
        userDto.setFlat(user.getFlat());
        userDto.setPhone(user.getPhone());
        userDto.setRole(user.getRole());
        return userDto;
    }

    private User convertToUser(UserDto userDto){
        User user = new User();
        if(userDto.getId() !=  null){
            user.setId(userDto.getId());
        }
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setCity(userDto.getCity());
        user.setStreet(userDto.getStreet());
        user.setHouse(userDto.getHouse());
        user.setFlat(userDto.getFlat());
        user.setPhone(userDto.getPhone());
        user.setRole(userDto.getRole());
        return user;
    }
}
