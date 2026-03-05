package com.michael.pe_sba301_sp25_be_nguyenvanan.jwt;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenProvider {
	
	private final SecretKey secretKey;
	private final JwtProperties jwtProperties;
	
	
	private String generateToken(Authentication authentication) {
		List<String> authorities = authentication.getAuthorities().stream()
		                                         .map(GrantedAuthority::getAuthority)  // ← dùng getAuthority() thay vì toString()
		                                         .toList();
		try {
			return  Jwts.builder()
			                   .subject(authentication.getName())
			                   .claim("authorities", authorities)
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
