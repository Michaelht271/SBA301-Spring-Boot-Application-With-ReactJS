package com.michael.a3nguyenvanan18d04.configs;

import com.michael.a3nguyenvanan18d04.jwts.JwtProperties;
import com.michael.a3nguyenvanan18d04.jwts.JwtTokenValidationFilter;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;

@Configuration
@EnableWebSecurity
@Slf4j
public class    SecurityConfig {
	private final JwtProperties jwtProperties;
	
	public SecurityConfig(JwtProperties jwtProperties) {
		this.jwtProperties = jwtProperties;
	}
	
	@Bean
	public SecretKey secretKey() {
		return Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http){
		JwtTokenValidationFilter jwtTokenValidationFilter = new JwtTokenValidationFilter(secretKey(), jwtProperties);
		return http
				.csrf(AbstractHttpConfigurer::disable)
				.cors(Customizer.withDefaults())
				.sessionManagement( session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests( auth ->
						auth.requestMatchers("/api/v1/auth/**").permitAll()
				             .anyRequest().authenticated()
						
				)
				.addFilterBefore(jwtTokenValidationFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	
}
