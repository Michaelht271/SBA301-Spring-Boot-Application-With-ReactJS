package com.michael.pe_sba301_sp25_be_nguyenvanan.jwt;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "application.jwt")
@RequiredArgsConstructor
@Data
public class JwtProperties {
	private String secretKey;
	private long expiration;
	private String header;
	private String tokenPrefix;
	
}
