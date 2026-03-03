package com.michael.a3nguyenvanan18d04.jwts;

import lombok.*;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "application.jwt")
@RequiredArgsConstructor
@Data
public class    JwtProperties {
	private String secretKey;
	private Integer tokenExpirationAfterDays;
	private String tokenPrefix;
	private String headerString;

}
