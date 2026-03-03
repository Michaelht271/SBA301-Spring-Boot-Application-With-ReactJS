package com.michael.pe_sba301_sp25_be_nguyenvanan.jwt;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenProvider {
	
	private final SecretKey secretKey;
	private final JwtProperties jwtProperties;
	
	
	private String generateToken(Authentication authentication) {
		try {
			return  Jwts.builder()
			                   .subject(authentication.getName())
			                   .claim("authorities", authentication.getAuthorities().stream().map(Object::toString).toList())
			                   .issuedAt(new Date())
			                   .expiration(new Date(new Date().getTime() + jwtProperties.getExpiration()))
			                   .signWith(secretKey)
			                   .compact();
		
		} catch (Exception e) {
			log.error("Error generating JWT token: {}", e.getMessage());
			return null;
		}
	}
	
	public String generateTokenWithPrefix(Authentication authentication) {
		try {
			log.info("Create a jwt token with prefix{}", jwtProperties.getTokenPrefix());
			return jwtProperties.getTokenPrefix()+" " + generateToken(authentication);
		} catch ( Exception e ){
			log.error("Error generating JWT token with prefix: {} {}", jwtProperties.getTokenPrefix(),   e.getMessage());
			return null;
		}
	}
	
	
}
