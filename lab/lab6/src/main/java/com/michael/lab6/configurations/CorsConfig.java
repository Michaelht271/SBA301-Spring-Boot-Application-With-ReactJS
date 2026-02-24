package com.michael.lab6.configurations;

import org.springframework.context.annotation.*;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration

public class CorsConfig {
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		
		CorsConfiguration corsConfiguration = new CorsConfiguration();corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173"));
		corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
		corsConfiguration.setAllowedHeaders(List.of("Origin",
		                                            "Access-Control-Allow-Origin",
		                                            "Content-Type",
		                                            "Accept",
		                                            "Jwt-Token",
		                                            "Authorization",
		                                            "Origin, Accept",
		                                            "X-Requested-With",
		                                            "Access-Control-Request-Method",
		                                            "Access-Control-Request-Headers"));
		
		corsConfiguration.setExposedHeaders(List.of("Origin", "Content-Type", "Accept", "Jwt-Token",
		                                            "Authorization", "Access-Control-Allow-Origin"));
		corsConfiguration.setAllowCredentials(true);
		
		corsConfiguration.setMaxAge(3600L);
		
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		
		return urlBasedCorsConfigurationSource;
	}
}
