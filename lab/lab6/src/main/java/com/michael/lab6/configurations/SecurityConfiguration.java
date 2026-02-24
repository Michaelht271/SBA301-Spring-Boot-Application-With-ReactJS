package com.michael.lab6.configurations;

import com.michael.lab6.jwt.JwtTokenValidationFilter;
import com.michael.lab6.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import javax.crypto.SecretKey;


@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfiguration {
	private final JwtConfig jwtConfig;
	
	public SecurityConfiguration(JwtConfig jwtConfig) {
		this.jwtConfig = jwtConfig;
	}
	@Bean
	public SecretKey secretKey() {
		return Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
	}
	
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
		
		JwtUsernameAndPasswordAuthenticationFilter jwtAuthenticationFilter =
				new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager, secretKey(), jwtConfig);
		jwtAuthenticationFilter.setFilterProcessesUrl("/api/auth/login");
		
		JwtTokenValidationFilter jwtValidationFilter =
				new JwtTokenValidationFilter(secretKey(), jwtConfig.getTokenPrefix());
		return http
				.cors(Customizer.withDefaults())
				.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth
						.requestMatchers("/api/auth/login", "/api/auth/**", "/api/auth/news", "/api/auth/register").permitAll()
				)
				.addFilterBefore(jwtValidationFilter, JwtUsernameAndPasswordAuthenticationFilter.class)
				.addFilterBefore(jwtAuthenticationFilter, JwtTokenValidationFilter.class)
				.build();
	}
}
