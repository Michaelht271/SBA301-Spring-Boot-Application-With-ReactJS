package com.michael.pe_sba301_sp25_be_nguyenvanan.config;

import com.michael.pe_sba301_sp25_be_nguyenvanan.jwt.JwtProperties;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;

@Configuration
public class WebConfig {
	@Bean
	public PasswordEncoder passwordEncoder() {
	return new BCryptPasswordEncoder(12);}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) {
		return authenticationConfiguration.getAuthenticationManager();
	}
	@Bean
	public SecretKey secretKey(JwtProperties jwtProperties) {
		return Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());
	}
}
