package com.michael.a2nguyenvanan18d04.config;

import com.michael.a2nguyenvanan18d04.Filter.JwtTokenValidationFilter;
import com.michael.a2nguyenvanan18d04.Filter.JwtUsernameAndPasswordAuthenticationFilter;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {
	
	private final JwtConfig jwtConfig;
	
	public SecurityConfig(JwtConfig jwtConfig) {
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
	public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
		JwtUsernameAndPasswordAuthenticationFilter jwtAuthenticationFilter =
				new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager, secretKey(), jwtConfig);
		jwtAuthenticationFilter.setFilterProcessesUrl("/api/auth/login");
		
		JwtTokenValidationFilter jwtValidationFilter =
				new JwtTokenValidationFilter(secretKey(), jwtConfig.getTokenPrefix());
		
		return http
				.cors(Customizer.withDefaults())
				.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(session ->
						                   session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				)
				.authorizeHttpRequests(auth -> auth
						.requestMatchers("/api/auth/login", "/api/auth/csrf", "/api/news").permitAll()
						.requestMatchers("/api/auth/me").authenticated()
						.requestMatchers("/admin/**", "/api/users/**").hasRole("ADMIN")
						.requestMatchers("/staff/**").hasRole("STAFF")
						.anyRequest().authenticated()
				)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtValidationFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
}
