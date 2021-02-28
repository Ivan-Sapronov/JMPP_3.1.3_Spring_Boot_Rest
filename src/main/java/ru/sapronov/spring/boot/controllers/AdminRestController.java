package ru.sapronov.spring.boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sapronov.spring.boot.dto.UserDto;
import ru.sapronov.spring.boot.models.Role;
import ru.sapronov.spring.boot.models.User;
import ru.sapronov.spring.boot.services.RoleService;
import ru.sapronov.spring.boot.services.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Ivan Sapronov on 28.02.2021
 * @project spring-boot-rest
 */
@RestController
@RequestMapping("/admin")
public class AdminRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping
    public List<UserDto> showAllUsers() {
        return getDtoList(userService.index());
    }


    @GetMapping("{id}")
    public UserDto showUserById(@PathVariable Long id){
        return new UserDto(userService.show(id));
    }

    //TODO: использовать dtoToUser !!!!!!!!!
    @PostMapping
    public  List<UserDto> createNewUser(@RequestBody UserDto dto) {
        userService.save(dtoToUser(dto));
        //userService.save(new User(dto));
        return getDtoList(userService.index());
    }

    @PutMapping
    public List<UserDto> updateUser(@RequestBody UserDto dto) {
        userService.update(userService.show(dto.getId()));
        return getDtoList(userService.index());
    }

    @DeleteMapping
    public List<UserDto> deleteUser(@RequestBody UserDto dto) {
        userService.delete(dto.getId());
        return getDtoList(userService.index());
    }

    private List<UserDto> getDtoList(List<User> users) {
        return users.stream().map(user -> new UserDto(user)).collect(Collectors.toList());
    }

    private User dtoToUser(UserDto dto) {
        User user = new User(dto);
        user.setRoles(dto.getRoles().stream()
                .map(r -> roleService.getRoleByName(r)).collect(Collectors.toSet()));
        return user;
    }
}
