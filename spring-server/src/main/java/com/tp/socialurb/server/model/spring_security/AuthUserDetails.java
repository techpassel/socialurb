package com.tp.socialurb.server.model.spring_security;

import com.tp.socialurb.server.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AuthUserDetails implements UserDetails {
    private String userName;
    private String password;
    private String userId;
    private boolean active;
    private List<GrantedAuthority> authorities;
    private User user;

    public User getUser() {
        return user;
    }

    public AuthUserDetails(User user) {
        this.user = user;
        this.userName = user.getEmail();
        this.password = user.getPassword();
        this.active = user.isActive();
        this.userId = user.getId();
        this.authorities = Stream.of(user.getRole()).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    public String getUserId(){ return userId; }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
