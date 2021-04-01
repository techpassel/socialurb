package com.tp.socialurb.server.domain.dto;

import javax.validation.constraints.NotNull;
// The Data Transfer Object(DTO) Design Pattern is one of the enterprise application architecture patterns that calls for the use of objects that aggregate and encapsulate data for transfer.
// A Data Transfer Object(DTO) is, essentially, like a data structure. It should not contain any business logic but should contain serialization and deserialization mechanisms.

public class LoginRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
