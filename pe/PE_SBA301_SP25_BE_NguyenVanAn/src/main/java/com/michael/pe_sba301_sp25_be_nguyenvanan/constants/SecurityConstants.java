package com.michael.pe_sba301_sp25_be_nguyenvanan.constants;

import org.springframework.stereotype.Component;

@Component
public record Constant() {
	public static String[] PUBLIC_PATH = {"/api/v1/auth/**",
	                                                 "/swagger-ui/**",
	                                                 "/swagger-ui.html",
	                                                 "/v3/api-docs/**",
	                                                 "/api-docs.yaml"} ;
}
