package com.michael.lab6.controllers;



import com.michael.lab6.dtos.RegistrationRequest;
import com.michael.lab6.entities.Role;
import com.michael.lab6.entities.User;
import com.michael.lab6.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final UserService systemAccountService;
	private final PasswordEncoder passwordEncoder;
	
	public AuthController(UserService systemAccountService, PasswordEncoder passwordEncoder) {
		this.systemAccountService = systemAccountService;
		this.passwordEncoder = passwordEncoder;
	}
	
	
	@GetMapping("/csrf")
	public ResponseEntity<Map<String, String>> getCsrfToken(CsrfToken csrfToken) {
		return ResponseEntity.ok(Map.of(
				"token", csrfToken.getToken(),
				"headerName", csrfToken.getHeaderName()
		));
	}
	
	@GetMapping("/me")
	public ResponseEntity<Map<String, Object>> getCurrentUser(Authentication authentication) {
		if (authentication == null || !authentication.isAuthenticated()) {
			return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
		}
		
		
		User account = systemAccountService.findByEmail(authentication.getName());
		
		Map<String, Object> userInfo = new HashMap<>();
		userInfo.put("username", account.getUsername());
		userInfo.put("email", authentication.getName());
		userInfo.put("id", account.getId() );
		userInfo.put("authorities", authentication.getAuthorities());
		
		
		return ResponseEntity.ok(userInfo);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		SecurityContextHolder.clearContext();
		return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
		// Check if user exists (Assuming findByEmail returns null if not found)
		if (systemAccountService.findByEmail(request.getEmail()) != null) {
			return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
		}

		User newUser = new User();
		newUser.setFullName(request.getUsername());
		newUser.setEmail(request.getEmail());
		newUser.setRole(Role.USER);
		// Hash the password before saving
		newUser.setPassword(passwordEncoder.encode(request.getPassword()));
		
		systemAccountService.createUser(newUser);
		
		return ResponseEntity.ok(Map.of("message", "User registered successfully"));
	}
	
	
}
