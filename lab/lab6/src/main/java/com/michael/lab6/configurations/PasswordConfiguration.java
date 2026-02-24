package com.michael.lab6.configurations;

import org.springframework.context.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;



@Configuration
public class PasswordConfiguration {
	@Bean
	public PasswordEncoder passwordEncoder () {
		return new BCryptPasswordEncoder(12);
	}
}
