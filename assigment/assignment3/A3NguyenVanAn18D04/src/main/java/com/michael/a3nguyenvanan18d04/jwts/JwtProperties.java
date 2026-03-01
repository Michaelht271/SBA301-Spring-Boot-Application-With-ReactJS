package com.michael.a3nguyenvanan18d04.jwts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "application.jwt")
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
@Getter
@Setter
public class JwtProperties {
	private String secretKey;
	private Integer tokenExpirationAfterDays;
	private String tokenPrefix;
	private String headerString;

}
