package com.tp.socialurb.server.repository;

import com.tp.socialurb.server.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {
    // If we want only email and password with same conditions.
    // @Query(value="{ '$or':[ {'email': ?0}, {'phone':?0} ] }", fields="{ 'email' : 1, 'password' : 1, 'id': 0}")
    @Query("{'$or':[ {'email': ?0}, {'phone':?0} ]}")
    Optional<User> findOneByEmailOrPhone(String key);
}
