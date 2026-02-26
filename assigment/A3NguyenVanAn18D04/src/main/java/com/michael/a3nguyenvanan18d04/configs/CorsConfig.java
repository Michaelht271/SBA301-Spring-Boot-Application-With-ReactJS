package com.michael.a3nguyenvanan18d04.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		
		// 1. Allowed Origin
		corsConfiguration.setAllowedOrigins(List.of("*") );
		
		// 2. Allowed Method
		
		corsConfiguration.setAllowedMethods(List.of("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		
		// 3. Allowed Header
		corsConfiguration.setAllowedHeaders(List.of(
				"Authorization",
				"Accept",
				"X-Request-With",
				"Content-Type",
				"Access-Control-Request-Method",
				"Access-Control-Request-Header"));
		
		// 4.  Exposed Headers
		corsConfiguration.setExposedHeaders(List.of(
				"Origin",
				"Content-Type",
				"Accept",
				"Authorization",
				"Access-Control-Allow-Origin",
				"Access-Control-Allow-Credentials"
		));
		
		// 5. Credentials
		corsConfiguration.setAllowCredentials(true);
		
		// 6. Cache
		corsConfiguration.setMaxAge(3600L);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;

	}
}
