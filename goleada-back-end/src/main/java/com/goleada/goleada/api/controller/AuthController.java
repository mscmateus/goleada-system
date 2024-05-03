package com.goleada.goleada.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goleada.goleada.configs.AccountCredentialsVO;
import com.goleada.goleada.models.entitys.User;
import com.goleada.goleada.services.AuthService;

@RestController
@RequestMapping
public class AuthController {

    @Autowired
    AuthService authService;

    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/login")
    public ResponseEntity signin(@RequestBody AccountCredentialsVO data) {
        if (checkIfParamsIsNotNull(data))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas!");

        var token = authService.signin(data);
        if (token == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas!");
        return token;
    }

    private boolean checkIfParamsIsNotNull(AccountCredentialsVO data) {
        return data == null || data.getUsername() == null || data.getUsername().isBlank() || data.getPassword() == null
                || data.getPassword().isBlank();
    }

    @SuppressWarnings("rawtypes")
    @PutMapping(value = "/refresh")
    public ResponseEntity refreshToken(@AuthenticationPrincipal User user,
            @RequestHeader("Authorization") String refreshToken) {
        if (checkIfParamsIsNotNull(user.getUsername(), refreshToken))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas!");

        var token = authService.refreshToken(user.getUsername(), refreshToken);
        if (token == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas!");
        return token;
    }

    private boolean checkIfParamsIsNotNull(String username, String refreshToken) {
        return refreshToken == null || refreshToken.isBlank() || username == null || username.isBlank();
    }
}
