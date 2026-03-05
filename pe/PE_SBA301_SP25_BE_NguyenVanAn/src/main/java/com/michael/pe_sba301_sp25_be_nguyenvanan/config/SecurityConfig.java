package com.michael.pe_sba301_sp25_be_nguyenvanan.config;

import com.michael.pe_sba301_sp25_be_nguyenvanan.enums.Role;
import com.michael.pe_sba301_sp25_be_nguyenvanan.jwt.JwtApplicationFilter;

import org.springframework.context.annotation.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

@Configuration
public class SecurityConfig {
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, JwtApplicationFilter jwtApplicationFilter)
			throws Exception {
		httpSecurity. cors(Customizer.withDefaults())
		            .csrf(AbstractHttpConfigurer::disable)
		            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		            
		            .authorizeHttpRequests(auth -> auth
				            .requestMatchers("/api/v1/auth/**").permitAll()
				            .requestMatchers(HttpMethod.GET, "/api/v1/cars", "/api/v1/cars/**").permitAll()
				            .requestMatchers(HttpMethod.DELETE, "/api/v1/admin/cars/**").permitAll()
				            .requestMatchers(HttpMethod.PUT, "/api/v1/admin/cars/**").hasRole("ADMIN")
				            .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
				            .anyRequest().authenticated()
		            )
		            .addFilterBefore(jwtApplicationFilter, UsernamePasswordAuthenticationFilter.class)				;
		
		return httpSecurity.build();
		
	}
	
	
}
