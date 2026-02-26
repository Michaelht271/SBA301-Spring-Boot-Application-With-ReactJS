package com.michael.a3nguyenvanan18d04.jwts;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * JWT token Provider - Tạo và validate JWT token*
 * Class này tách logic JWT ra khỏi Filter/ Controller
 * dễ dàng tái sử dụng và text
 */
@Component
@Slf4j
public class JwtTokenProvider {
	
	private final SecretKey secretKey;
	private final JwtProperties jwtProperties;
	
	public JwtTokenProvider(SecretKey secretKey, JwtProperties jwtProperties) {
		this.secretKey = secretKey;
		this.jwtProperties = jwtProperties;
	}
	
	
	/**
	 * Generate JWT token từ Authentication object
	 *
	 * @param authentication Authentication object chứa User Information
	 * @return JWT token string ( Không có Bearer " prefix )
	 */
	
	public String generateToken(Authentication authentication) {
		try {
			String token = Jwts.builder()
			                   .subject(authentication.getName())
			                   .claim("authorities", authentication.getAuthorities())
			                   .issuedAt(new Date())
			                   .expiration(new Date(new Date().getTime() + jwtProperties.getTokenExpirationAfterDays()))
			                   .signWith(secretKey)
			                   .compact();
			
			log.info("Create a jwt token successfully");
			return token;
		} catch (Exception e) {
			log.error("Error while creating a jwt token: {}", e.getMessage());
			return null;
		}
	}
	
	public String generateTokenWithPrefix (Authentication authentication) {
		log.info("Create a jwt token successfully with prefix {}", jwtProperties.getTokenPrefix());
		return jwtProperties.getTokenPrefix() + generateToken(authentication);
	}
	
}
