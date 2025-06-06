package com.nisum.controller;

import com.nisum.dao.UserDAO;
import com.nisum.model.User;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> payload, HttpSession session) {
        String email = payload.get("email");
        String password = payload.get("password");
        UserDAO userDAO = new UserDAO();
        User user = userDAO.getUserByCredentials(email, password);
        Map<String, Object> response = new HashMap<>();
        if (user != null) {
            session.setAttribute("userFirstName", user.getFirstName());
            session.setAttribute("userId", user.getUserId());
            response.put("success", true);
            response.put("firstName", user.getFirstName());
        } else {
            response.put("success", false);
            response.put("error", "Invalid email or password.");
        }
        return response;
    }
}
