package ru.sapronov.spring.boot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Ivan Sapronov on 28.02.2021
 * @project spring-boot-rest
 */
@Controller
@RequestMapping
public class MainController {

    @GetMapping("/index")
    public String mainPage() {
        return "index";
    }

    @GetMapping("login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("user")
    public String userPage() {
        return "user";
    }
}
