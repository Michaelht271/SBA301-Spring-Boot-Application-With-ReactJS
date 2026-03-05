package com.michael.pe_sba301_sp25_be_nguyenvanan.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtApplicationFilter extends OncePerRequestFilter {
	private final JwtProperties jwtProperties;
	private final SecretKey secretKey;
	@Override
	protected  void doFilterInternal(@Nonnull HttpServletRequest request,
	                                 @Nonnull HttpServletResponse response,
	                                 @Nonnull FilterChain filterChain) throws
	                                                                   IOException {
		try {
			log.debug("Request URL: {}", request.getRequestURL());
			String authorizationHeader = request.getHeader(jwtProperties.getHeader());
			
			if (authorizationHeader == null || !authorizationHeader.startsWith(jwtProperties.getTokenPrefix()+ " ")) {
				filterChain.doFilter(request, response);
				return;
				
			}
			String token = authorizationHeader.replace(jwtProperties.getTokenPrefix(), "").trim();
			log.debug("JWT Token: {}", token);
			Claims claims = Jwts.parser()
			                    .verifyWith(secretKey)
			                    .build()
			                    .parseSignedClaims(token)
			                    .getPayload();
			String username = claims.getSubject();
			Object authoritiesObj = claims.get("authorities");
			List<SimpleGrantedAuthority> grantedAuthorities;
			if (authoritiesObj instanceof List<?> authList) {
				grantedAuthorities = authList.stream()
				                             .map(Object::toString)
				                             .map(SimpleGrantedAuthority::new)
				                             .toList();
			} else {
				grantedAuthorities = List.of(new SimpleGrantedAuthority("ROLE_MEMBER"));
			}
			
			log.debug("User: {}, Authorities: {}", username, grantedAuthorities);
			Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, grantedAuthorities);
			SecurityContextHolder.getContext().setAuthentication( authentication);
			filterChain.doFilter(request, response);
			
		} catch (JwtException e) {
			log.error("JWT validation failed: {}", e.getMessage());
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setContentType("application/json");
			response.getWriter().write("{\"error\":\"Invalid or expired token\"}");
		} catch (Exception e) {
			log.error("Unexpected error in JWT filter: {}", e.getMessage());
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.setContentType("application/json");
			response.getWriter().write("{\"error\":\"Internal server error\"}");
		}
	}
}