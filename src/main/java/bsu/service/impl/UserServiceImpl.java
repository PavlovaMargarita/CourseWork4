package bsu.service.impl;

import bsu.enumProperty.RoleEnum;
import bsu.model.dto.UserDto;
import bsu.model.hibernate.User;
import bsu.repository.UserRepository;
import bsu.service.UserService;
import com.nexmo.messaging.sdk.NexmoSmsClient;
import com.nexmo.messaging.sdk.SmsSubmissionResult;
import com.nexmo.messaging.sdk.messages.TextMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public static final String API_KEY = "909c926f";
    public static final String API_SECRET = "ac5a430e";

    public static final String SMS_FROM = "375333109959";
//    public static final String SMS_TO = "447777111222";
//    public static final String SMS_TEXT = "Hello World!";

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
        if(userDto.getId() == null && userDto.getVerifyNumber() == null){

        }
        User user = convertToUser(userDto);
        userRepository.save(user);
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findOne(userId);
        UserDto userDto = convertToUserDto(user);
        return userDto;
    }

    @Override
    public Integer verifyUser(String phone) {
        NexmoSmsClient client = null;
        try {
            client = new NexmoSmsClient(API_KEY, API_SECRET);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to instanciate a Nexmo Client");
        }
        Random rand = new Random();
        int max = 999999;
        int min = 100000;
        int randomNum = rand.nextInt((max - min) + 1) + min;
        TextMessage message = new TextMessage(SMS_FROM, phone, new Integer(randomNum).toString());
        SmsSubmissionResult[] results = null;
        try {
            results = client.submitMessage(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to communicate with the Nexmo Client");
        }

        boolean isOK = true;
        for (int i=0;i<results.length;i++) {
            if (!(results[i].getStatus() == SmsSubmissionResult.STATUS_OK)) {
                isOK = false;
                break;
            }
        }
        if(isOK) {
            return randomNum;
        }
        return -1;
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
