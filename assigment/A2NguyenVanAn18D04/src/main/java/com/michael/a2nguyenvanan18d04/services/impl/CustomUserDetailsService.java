package com.michael.a2nguyenvanan18d04.services.impl;


import com.michael.a2nguyenvanan18d04.models.CustomerUserDetails;
import com.michael.a2nguyenvanan18d04.models.SystemAccount;
import com.michael.a2nguyenvanan18d04.repositories.SystemAccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
	private final SystemAccountRepository systemAccountRepository;
	
	public CustomUserDetailsService(SystemAccountRepository systemAccountRepository) {
		this.systemAccountRepository = systemAccountRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		SystemAccount user = systemAccountRepository.findByAccountEmail(username)
		                                            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
		if (!user.isActive()) {
			throw new UsernameNotFoundException("User is disabled");
		}
		return new CustomerUserDetails(user);
	}
}
