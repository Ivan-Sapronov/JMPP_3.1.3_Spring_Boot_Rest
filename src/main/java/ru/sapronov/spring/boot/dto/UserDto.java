package ru.sapronov.spring.boot.dto;

import lombok.Data;
import ru.sapronov.spring.boot.models.User;

import java.util.List;

/**
 * @author Ivan Sapronov on 27.02.2021
 * @project spring-boot-rest
 */
@Data
public class UserDto {
    private Long id;
    private String username;
    private String firstname;
    private String surname;
    private int age;
    private String email;
    private String password;
    private List<String> roles;

    public UserDto() {
    }

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.firstname = user.getFirstname();
        this.surname = user.getSurname();
        this.age = user.getAge();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.roles = user.getRolesInString();
    }
}
