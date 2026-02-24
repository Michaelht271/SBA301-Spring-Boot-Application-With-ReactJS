package com.michael.lab6.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;
}