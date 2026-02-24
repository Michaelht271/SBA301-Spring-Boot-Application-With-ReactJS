package com.michael.lab6.jwt;

import com.michael.lab6.configurations.JwtConfig;
import com.michael.lab6.dtos.UsernameAndPasswordAuthenticationRequest;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.time.LocalDate;

@Slf4j
public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	private final AuthenticationManager authenticationManager;
	private final SecretKey secretKey;
	private final JwtConfig jwtConfig;
	
	public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authenticationManager,
	                                                  SecretKey secretKey, JwtConfig jwtConfig) {
		this.authenticationManager = authenticationManager;
		this.secretKey = secretKey;
		this.jwtConfig = jwtConfig;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			UsernameAndPasswordAuthenticationRequest authRequest = new ObjectMapper()
					.readValue(request.getInputStream(), UsernameAndPasswordAuthenticationRequest.class);
			
			if (authRequest.getUsername() == null || authRequest.getPassword() == null) {
				throw new AuthenticationException("Username and password are required") {};
			}
			
			Authentication authentication = new UsernamePasswordAuthenticationToken(
					authRequest.getUsername(),
					authRequest.getPassword()
			
			);
			
			return authenticationManager.authenticate(authentication);
			
		} catch (IOException e) {
			log.error("Error parsing authentication request: {}", e.getMessage());
			throw new RuntimeException("Invalid request format", e);
		}
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
	                                        FilterChain chain, Authentication authResult) throws IOException, ServletException {
		try {
			String token = Jwts.builder()
			                   .setSubject(authResult.getName())
			                   .claim("authorities", authResult.getAuthorities().stream()
			                                                   .map(a -> a.getAuthority())
			                                                   .toList())
			                   .setIssuedAt(new java.util.Date())
			                   .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
			                   .signWith(secretKey)
			                   .compact();
			
			// ensure there's a space between prefix and token
			String bearerToken = jwtConfig.getTokenPrefix() + " " + token;
			
			response.setStatus(HttpServletResponse.SC_OK);
			response.setContentType("application/json");
			response.addHeader("Authorization", bearerToken);
			response.getWriter().write("{\"token\":\"" + bearerToken + "\"}");
			
			log.info("User {} logged in successfully", authResult.getName());
			
		} catch (Exception e) {
			log.error("Error generating JWT token: {}", e.getMessage());
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.setContentType("application/json");
			response.getWriter().write("{\"error\":\"Failed to generate token\"}");
		}
	}
	
	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
	                                          AuthenticationException failed) throws IOException, ServletException {
		log.warn("Authentication failed: {}", failed.getMessage());
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json");
		response.getWriter().write("{\"error\":\"Invalid username or password\"}");
	}
}
