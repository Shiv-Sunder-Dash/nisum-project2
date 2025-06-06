package com.nisum.controller;

import com.nisum.dao.UserDAO;
import com.nisum.model.User;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RegisterController {

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String email = payload.get("email");
        String password = payload.get("password");
        String firstName = payload.get("firstName");
        String lastName = payload.get("lastName");
        User user = new User(username, email, password, firstName, lastName);
        UserDAO userDAO = new UserDAO();
        Map<String, Object> response = new HashMap<>();
        if (userDAO.createUser(user)) {
            response.put("success", true);
        } else {
            response.put("success", false);
            response.put("error", "Registration failed. Please try again.");
        }
        return response;
    }
}
