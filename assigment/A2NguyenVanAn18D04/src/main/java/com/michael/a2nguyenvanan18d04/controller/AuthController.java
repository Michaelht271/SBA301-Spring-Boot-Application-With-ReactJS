package com.michael.a2nguyenvanan18d04.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.web.csrf.CsrfToken;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
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
		
		Map<String, Object> userInfo = new HashMap<>();
		userInfo.put("username", authentication.getName());
	
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
}
