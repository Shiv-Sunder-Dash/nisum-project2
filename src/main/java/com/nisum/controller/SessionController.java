package com.nisum.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SessionController {
    @GetMapping("/session")
    public Map<String, Object> getSession(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        Object userFirstName = session.getAttribute("userFirstName");
        if (userFirstName != null) {
            response.put("loggedIn", true);
            response.put("firstName", userFirstName);
        } else {
            response.put("loggedIn", false);
        }
        return response;
    }

    @PostMapping("/logout")
    public Map<String, Object> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }
}

