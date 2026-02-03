package com.michael.a2nguyenvanan18d04.services.impl;

import com.michael.a2nguyenvanan18d04.models.SystemAccount;
import com.michael.a2nguyenvanan18d04.repositories.SystemAccountRepository;
import com.michael.a2nguyenvanan18d04.services.interfaces.SystemAccountService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service // Mark as a Spring service
public class SystemAccountServiceImpl implements SystemAccountService, UserDetailsService {
	
	private final SystemAccountRepository systemAccountRepository;
	
	public SystemAccountServiceImpl(SystemAccountRepository systemAccountRepository) {
		this.systemAccountRepository = systemAccountRepository;
	}
	@Override
	public List<SystemAccount> getAllSystemAccounts() {
		return systemAccountRepository.findAll();
	}
	@Override
	public Optional<SystemAccount> getSystemAccountById(Long id) {
		return systemAccountRepository.findById(id);
	}
	@Override
	public boolean createSystemAccount(SystemAccount systemAccount) {
		systemAccountRepository.save(systemAccount);
		return true;
	}
	@Override
	public boolean updateSystemAccount(SystemAccount systemAccount) {
		systemAccountRepository.save(systemAccount);
		return true;
	}
	@Override
	public boolean deleteSystemAccountById(Long id) {
		if(systemAccountRepository.existsById(id)){
			systemAccountRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		SystemAccount systemAccount = systemAccountRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
		
		// Assuming SystemAccount has a 'role' or 'roles' field.
		// For simplicity, let's assume a single role "USER" for now.
		Collection<? extends GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		
		return new User(systemAccount.getAccountEmail(), systemAccount.getAccountPassword(), authorities);
	}
}
