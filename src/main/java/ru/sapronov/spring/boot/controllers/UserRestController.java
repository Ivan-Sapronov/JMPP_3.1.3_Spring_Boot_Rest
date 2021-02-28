package ru.sapronov.spring.boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.sapronov.spring.boot.dto.UserDto;
import ru.sapronov.spring.boot.models.User;
import ru.sapronov.spring.boot.services.UserService;

/**
 * @author Ivan Sapronov on 28.02.2021
 * @project spring-boot-rest
 */
@RestController
@RequestMapping("/current_user")
public class UserRestController {

    @Autowired
    private UserService userService;

    @GetMapping
    public UserDto getCurrentUser(@AuthenticationPrincipal UserDetails details) {
        User currentUser = userService.getUserByUsername(details.getUsername());
        return new UserDto(currentUser);
    }
}
