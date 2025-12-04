package com.trai.backend.user;

import com.trai.backend.user.dto.LoginRequest;
import com.trai.backend.user.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String jwt = userService.loginUser(loginRequest);
            return ResponseEntity.ok(new LoginResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

