package com.michael.pe_sba301_sp25_be_nguyenvanan.entites;

import com.michael.pe_sba301_sp25_be_nguyenvanan.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Table(name = "AccountMember")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountMember implements UserDetails {
	@Id
	@GeneratedValue (strategy =  GenerationType.IDENTITY)
	private Long memberId;
	private String memberPassword;
	private String emailAddress;
	private Role role;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(
				new SimpleGrantedAuthority("ROLE_" + role.name())
		);
	}
	@Override
	public @Nullable String getPassword() {
		return this.memberPassword;
	}
	@Override
	public String getUsername() {
		return this.emailAddress;
	}
}
