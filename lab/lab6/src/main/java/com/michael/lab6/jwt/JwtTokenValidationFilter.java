package com.michael.lab6.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
public class JwtTokenValidationFilter extends OncePerRequestFilter {

    private final SecretKey secretKey;

    private final String tokenPrefix;


    public JwtTokenValidationFilter(SecretKey secretKey, String tokenPrefix) {
        this.secretKey = secretKey;
        this.tokenPrefix = tokenPrefix;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws
            ServletException,
            IOException {
        try {
            String authorizationHeader = request.getHeader("Authorization");
            // skip if no header or header does not start with the expected prefix + space
            if (authorizationHeader == null || !authorizationHeader.startsWith(tokenPrefix + " ")) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = authorizationHeader.replace(tokenPrefix, "").trim();
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String username = claims.getSubject();
            Object authoritiesObj = claims.get("authorities");
            List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();
            if (authoritiesObj instanceof List) {
                List<?> list = (List<?>) authoritiesObj;
                if (!list.isEmpty()) {
                    Object first = list.get(0);
                    if (first instanceof Map) {
                        List<Map<String, String>> authorities = (List<Map<String, String>>) list;
                        grantedAuthorities = authorities.stream()
                                .map(auth -> new SimpleGrantedAuthority(auth.get("authority")))
                                .collect(Collectors.toList());
                    } else {
                        grantedAuthorities = list.stream()
                                .filter(Objects::nonNull)
                                .map(Object::toString)
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList());
                    }
                }
            }
            log.debug("User: {}, Authorities: {}", username, grantedAuthorities);
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, grantedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

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
