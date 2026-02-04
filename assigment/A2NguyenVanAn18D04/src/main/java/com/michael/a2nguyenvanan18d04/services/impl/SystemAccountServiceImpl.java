package com.michael.a2nguyenvanan18d04.services.impl;

import com.michael.a2nguyenvanan18d04.dto.SystemAccountDTO;
import com.michael.a2nguyenvanan18d04.models.Role;
import com.michael.a2nguyenvanan18d04.models.SystemAccount;
import com.michael.a2nguyenvanan18d04.repositories.SystemAccountRepository;
import com.michael.a2nguyenvanan18d04.services.interfaces.SystemAccountService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SystemAccountServiceImpl implements SystemAccountService {
	
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
	public SystemAccount createSystemAccount(SystemAccountDTO accountDTO) {
		SystemAccount account = new SystemAccount();
		account.setAccountName(accountDTO.getAccountName());
		account.setAccountEmail(accountDTO.getAccountEmail());
		account.setAccountPassword(accountDTO.getAccountPassword());
		account.setActive(accountDTO.getActive() != null ? accountDTO.getActive() : false);
		
		// Convert String roles to Role enum
		if (accountDTO.getRoles() != null && !accountDTO.getRoles().isEmpty()) {
			Set<Role> roles = accountDTO.getRoles().stream()
					.map(Role::valueOf)
					.collect(Collectors.toSet());
			account.setRoles(roles);
		}
		
		return systemAccountRepository.save(account);
	}

	@Override
	public SystemAccount updateSystemAccount(SystemAccountDTO accountDTO) {
		if (systemAccountRepository.existsById(accountDTO.getAccountId())) {
			SystemAccount account = systemAccountRepository.findById(accountDTO.getAccountId()).orElse(null);
			if (account != null) {
				account.setAccountName(accountDTO.getAccountName());
				account.setAccountEmail(accountDTO.getAccountEmail());
				
				// Only update password if provided
				if (accountDTO.getAccountPassword() != null && !accountDTO.getAccountPassword().isEmpty()) {
					account.setAccountPassword(accountDTO.getAccountPassword());
				}
				
				account.setActive(accountDTO.getActive() != null ? accountDTO.getActive() : false);
				
				// Update roles if provided
				if (accountDTO.getRoles() != null && !accountDTO.getRoles().isEmpty()) {
					Set<Role> roles = accountDTO.getRoles().stream()
							.map(Role::valueOf)
							.collect(Collectors.toSet());
					account.setRoles(roles);
				}
				
				return systemAccountRepository.save(account);
			}
		}
		return null;
	}

	@Override
	public boolean deleteSystemAccountById(Long id) {
		if (systemAccountRepository.existsById(id)) {
			SystemAccount account = systemAccountRepository.findById(id).orElse(null);
			// Cannot delete if account has created any news articles
			if (account != null && !account.getNewsArticlesCreated().isEmpty()) {
				return false;
			}
			systemAccountRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}
}
