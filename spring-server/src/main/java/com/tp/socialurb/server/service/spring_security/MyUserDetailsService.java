package com.tp.socialurb.server.service.spring_security;

import com.tp.socialurb.server.model.User;
import com.tp.socialurb.server.model.spring_security.AuthUserDetails;
import com.tp.socialurb.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String searchKey) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findOneByEmailOrPhone(searchKey);
        user.orElseThrow(() -> new UsernameNotFoundException("User not found: " + searchKey));
        return user.map(AuthUserDetails::new).get(); //To convert user data as default UserDetails structure
    }
}
