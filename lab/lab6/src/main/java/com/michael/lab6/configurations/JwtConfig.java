package com.michael.lab6.configurations;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "application.jwt")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class JwtConfig {
	private String secretKey;
	private String tokenPrefix;
	private Integer tokenExpirationAfterDays;
}
