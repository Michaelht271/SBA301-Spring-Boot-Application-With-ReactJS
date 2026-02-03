package com.michael.a2nguyenvanan18d04.dto;

import com.michael.a2nguyenvanan18d04.models.SystemAccount;

public class LoginResponse {
    private String token;
    private SystemAccount user; // Or a DTO for SystemAccount to avoid exposing sensitive data

    public LoginResponse(String token, SystemAccount user) {
        this.token = token;
        this.user = user;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public SystemAccount getUser() {
        return user;
    }
}
