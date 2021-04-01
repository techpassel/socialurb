package com.tp.socialurb.server.domain.mapper;

import com.tp.socialurb.server.domain.dto.UserView;
import com.tp.socialurb.server.model.User;
import org.mapstruct.Mapper;

import java.util.List;
/*
 Mappers are mainly used to map two POJOs, primarily an Entity with a DTO.Here we are using 'MapStruct' for this purpose.
 With MapStruct we only need to create the interface, and the library will automatically create a concrete implementation during compile time.
 For more details about MapStruct refer to link - "https://www.baeldung.com/mapstruct".
*/
//Here (componentModel = "spring") is used to enable Dependency Injection capability of the Mapper.So use it as it is in every mapper.
@Mapper(componentModel = "spring")
public interface UserViewMapper {

    UserView toUserView(User user);

    List<UserView> toUserView(List<User> users);
}