package com.michael.a3nguyenvanan18d04.controllers;

import com.michael.a3nguyenvanan18d04.dtos.LoginRequest;
import com.michael.a3nguyenvanan18d04.jwts.JwtTokenProvider;
import com.michael.a3nguyenvanan18d04.jwts.JwtTokenValidationFilter;
import com.michael.a3nguyenvanan18d04.services.impl.CustomerServiceImpl;
import com.michael.a3nguyenvanan18d04.services.interfaces.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@CrossOrigin(origins = "*")
public class AuthController {
	private final CustomerService customerService;
	private final AuthenticationManager authenticationManager;
	private final JwtTokenProvider jwtTokenProvider;
	
	public AuthController(CustomerService customerService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
		this.customerService = customerService;
		this.authenticationManager = authenticationManager;
		this.jwtTokenProvider = jwtTokenProvider;
	}
	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
		try {
			log.info("Login request: {}", loginRequest.getUsername());
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			String token = jwtTokenProvider.generateTokenWithPrefix(authentication);
			return ResponseEntity.ok(token);
			
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
