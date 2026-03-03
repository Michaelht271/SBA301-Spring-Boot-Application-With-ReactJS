package com.michael.a3nguyenvanan18d04.controllers;

import com.michael.a3nguyenvanan18d04.dtos.auth.LoginRequest;
import com.michael.a3nguyenvanan18d04.dtos.auth.RegisterRequest;
import com.michael.a3nguyenvanan18d04.entites.Customer;
import com.michael.a3nguyenvanan18d04.enums.Role;
import com.michael.a3nguyenvanan18d04.jwts.JwtTokenProvider;
import com.michael.a3nguyenvanan18d04.services.interfaces.CustomerService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
			log.info("Generated token: {}", token);
			
			return ResponseEntity.ok(token);
			
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/me")
	public ResponseEntity<Object> getCustomerInformation(Authentication authentication  ) {
		if(authentication == null || !authentication.isAuthenticated()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
					"Unauthorized"
			);
		}
		Customer customer = customerService.getCustomerByEmail(authentication.getName());
		Map<String, Object> userInfo =  new HashMap<>();
		userInfo.put("id", customer.getCustomerID());
		userInfo.put("username", authentication.getName());
		userInfo.put("email", customer.getEmailAddress());
		userInfo.put("fullName", customer.getCustomerFullName());
		userInfo.put("telephone", customer.getTelephone());
		userInfo.put("birthday", customer.getCustomerBirthday());
		userInfo.put("roles", authentication.getAuthorities());
		return ResponseEntity.ok(userInfo);
	}
	
	@PostMapping("/register")
	public ResponseEntity<Object> register(@Valid @RequestBody RegisterRequest registerRequest) {
		try {
			log.info("Register request: {}", registerRequest.getEmail());
			Customer customer = Customer.builder()
			                            .emailAddress(registerRequest.getEmail())
			                            .roles(Role.CUSTOMER)
			                            .password(registerRequest.getPassword())
			                            .customerFullName(registerRequest.getFullName())
			                            .telephone(registerRequest.getTelephone())
			                            .customerBirthday(registerRequest.getBirthday())
			                            .build();
			return ResponseEntity.ok(customerService.createCustomer(customer));
		} catch (Exception e) {
			log.error("Register failed for username: {}", registerRequest.getEmail(), e);
			String errorMessage = e.getMessage() != null ? e.getMessage() : "Unknown error";
			return ResponseEntity.status(HttpStatus.CONFLICT).body( Map.of("message", "Register failed", "error", errorMessage));
		}
	}
}
