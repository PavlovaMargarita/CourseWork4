package bsu.service.impl;

import bsu.model.hibernate.User;
import bsu.repository.UserRepository;
import bsu.sessionclass.AuthenticatedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class CustomUserDetailService implements UserDetailsService {

//    @Autowired
//    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.readUser(s);
        if(user != null){
            List<GrantedAuthority> authorities =  new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getRole().name()));
            AuthenticatedUser authenticatedUser = new AuthenticatedUser(user.getUsername(), user.getPassword(), true, true, true, authorities);
            authenticatedUser.setUserId(user.getId());
            return authenticatedUser;
        } else{
            throw new UsernameNotFoundException("Can't locate user '" + s + "'");
        }
    }
}

