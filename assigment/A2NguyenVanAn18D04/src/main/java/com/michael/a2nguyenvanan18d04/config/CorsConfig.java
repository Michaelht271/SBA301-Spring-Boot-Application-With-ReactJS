package com.michael.a2nguyenvanan18d04.config;


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
		
		// 1. Allowed Origins
		corsConfiguration.setAllowedOrigins(List.of(
				"http://localhost:5173"
		));
		
		// 2. Allowed Methods
		corsConfiguration.setAllowedMethods(List.of(
				"GET", "POST", "PUT", "DELETE", "OPTIONS"
		));
		
		// 3. Allowed Headers - include Authorization and other required headers
		corsConfiguration.setAllowedHeaders(List.of(
				"Authorization",
				"Accept",
				"X-Requested-With",
				"Content-Type",
				"Access-Control-Request-Method",
				"Access-Control-Request-Headers"
		));
		
		// 4. Exposed Headers
		corsConfiguration.setExposedHeaders(List.of(
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