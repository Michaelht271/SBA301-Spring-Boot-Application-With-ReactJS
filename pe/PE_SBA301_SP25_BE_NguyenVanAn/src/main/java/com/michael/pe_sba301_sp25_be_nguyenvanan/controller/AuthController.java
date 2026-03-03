package com.michael.pe_sba301_sp25_be_nguyenvanan.controller;

import com.michael.pe_sba301_sp25_be_nguyenvanan.dtos.request.LoginRequest;
import com.michael.pe_sba301_sp25_be_nguyenvanan.dtos.response.LoginResponse;
import com.michael.pe_sba301_sp25_be_nguyenvanan.jwt.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {
	private final AuthenticationManager authenticationManagerManger;
	private final JwtTokenProvider jwtTokenProvider;
	
	@PostMapping("/login")
	
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest)
	{
		log.info("Login request received by {}", loginRequest.getUsername());
		
		Authentication authentication = authenticationManagerManger.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtTokenProvider.generateTokenWithPrefix(authentication);
		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(token);
		List<String> roles = authentication.getAuthorities()
		                                             .stream()
		                                             .map(GrantedAuthority::getAuthority).toList();
		loginResponse.setRoles(roles);
		return ResponseEntity.ok(loginResponse);
		
		
	}
	
	
}
