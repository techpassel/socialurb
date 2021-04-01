package com.tp.socialurb.server.domain.dto;

import lombok.Data;

// The Data Transfer Object(DTO) Design Pattern is one of the enterprise application architecture patterns that calls for the use of objects that aggregate and encapsulate data for transfer.
// A Data Transfer Object(DTO) is, essentially, like a data structure. It should not contain any business logic but should contain serialization and deserialization mechanisms.
public class UserView {
    private String id;
    private String email;
    private String firstName;
    private String lastName;

    public UserView(){
        super();
    }

    public UserView(String id, String email, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "UserView{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}
