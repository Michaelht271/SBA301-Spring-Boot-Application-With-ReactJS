package com.michael.lab6.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "[User]")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor
@Setter
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String email;
	
	private String fullName;
	
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@Column(name = "CreateAt")
	@CreatedDate
	@JsonIgnore
	private LocalDateTime createdAt;
	
	@Column(name = "UpdateAt")
	@LastModifiedDate
	@JsonIgnore
	private LocalDateTime updatedAt;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<Role> roles = List.of(role);
		return roles;
	}
	@Override
	public String getUsername() {
		return this.email;
	}
	
	public User(String email, String fullName, String password, Role role) {
		this.email = email;
		this.fullName = fullName;
		this.password = password;
		this.role = role;
	
	}
}
