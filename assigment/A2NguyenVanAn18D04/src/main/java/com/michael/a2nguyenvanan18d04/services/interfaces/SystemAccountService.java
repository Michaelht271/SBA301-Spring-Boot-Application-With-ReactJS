package com.michael.a2nguyenvanan18d04.services.interfaces;

import com.michael.a2nguyenvanan18d04.dto.SystemAccountDTO;
import com.michael.a2nguyenvanan18d04.models.SystemAccount;

import java.util.List;
import java.util.Optional;

public interface SystemAccountService {
	List<SystemAccount> getAllSystemAccounts();
	Optional<SystemAccount> getSystemAccountById(Long id);
	SystemAccount createSystemAccount(SystemAccountDTO accountDTO);
	SystemAccount updateSystemAccount(SystemAccountDTO accountDTO);
	boolean deleteSystemAccountById(Long id);
}
