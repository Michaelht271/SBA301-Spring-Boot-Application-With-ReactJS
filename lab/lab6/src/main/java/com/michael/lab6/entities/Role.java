package com.michael.lab6.entities;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
	USER, ADMIN, MODERATOR; // or whatever roles you have
	
	@Override
	public String getAuthority() {
		return name(); // or "ROLE_" + name() if you want the ROLE_ prefix
	}
}