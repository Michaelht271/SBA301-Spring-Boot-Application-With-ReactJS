package com.michael.a3nguyenvanan18d04.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RegisterRequest {
	private String email;
	private String fullName;
	private String password;
	private String telephone;
	private LocalDate birthday;
}
