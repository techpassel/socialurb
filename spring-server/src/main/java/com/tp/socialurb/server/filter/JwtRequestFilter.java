package com.tp.socialurb.server.filter;

import com.tp.socialurb.server.service.spring_security.MyUserDetailsService;
import com.tp.socialurb.server.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    MyUserDetailsService myUserDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //This filter will be used in SecurityConfigurer to validate token before each request.
        //To fetch the Authorization token from request header
        final String authHeader = request.getHeader("Authorization");

        String jwt = null;
        String username = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            //Here second condition is nothing but checking if the request hasn't already gone through the security context.
            jwt = authHeader.substring(7);  //To extract the Jwt token.Actually Authorization header consists of "Bearer", single white space and jwtToken.
            username = jwtUtil.getUsername(jwt);    //To get the username from token extracted in previous step.
        }
        if(username !=null){
            //To get the user details from the username fetched in previous step.
            UserDetails userDetails = this.myUserDetailsService.loadUserByUsername(username);
            //To check if given token is valid and not expired.
            boolean isTokenValid = jwtUtil.validateToken(jwt);
            //For further processing of request if token is valid.
            if(isTokenValid){
                //Here we are manually creating "UsernamePasswordAuthenticationToken" after validating token so that spring security can verify it and allow for further processing.
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                //Actually above three process is what spring security would have done by its own.
                //But now since we have modified security context hence we need to reconfigure it.
            }
        }
        //Finally we are passing the request and response to next filter in the chain
        filterChain.doFilter(request, response);
    }

}

