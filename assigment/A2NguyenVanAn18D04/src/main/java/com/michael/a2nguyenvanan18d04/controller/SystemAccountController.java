package com.michael.a2nguyenvanan18d04.controller;

import com.michael.a2nguyenvanan18d04.dto.SystemAccountDTO;
import com.michael.a2nguyenvanan18d04.dto.SystemAccountMapper;
import com.michael.a2nguyenvanan18d04.models.SystemAccount;
import com.michael.a2nguyenvanan18d04.services.interfaces.SystemAccountService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class SystemAccountController {
	
	private final PasswordEncoder passwordEncoder;
	private final SystemAccountService systemAccountService;
	private final SystemAccountMapper systemAccountMapper;

	public SystemAccountController(SystemAccountService systemAccountService, PasswordEncoder passwordEncoder, SystemAccountMapper systemAccountMapper) {
		this.systemAccountService = systemAccountService;
		this.passwordEncoder = passwordEncoder;
		this.systemAccountMapper = systemAccountMapper;
	}

	@GetMapping("")
	public ResponseEntity<List<SystemAccountDTO>> getAllAccounts() {
		List<SystemAccount> accounts = systemAccountService.getAllSystemAccounts();
		List<SystemAccountDTO> dtos = accounts.stream()
				.map(systemAccountMapper::toDTO)
				.collect(Collectors.toList());
		return ResponseEntity.ok(dtos);
	}

	@GetMapping("/{id}")
	public ResponseEntity<SystemAccountDTO> getAccountById(@PathVariable Long id) {
		return systemAccountService.getSystemAccountById(id)
				.map(systemAccountMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping("")
	public ResponseEntity<SystemAccountDTO> createAccount(@RequestBody SystemAccountDTO accountDTO) {
		// Encode password before saving
		if (accountDTO.getAccountPassword() != null) {
			accountDTO.setAccountPassword(passwordEncoder.encode(accountDTO.getAccountPassword()));
		}
		SystemAccount createdAccount = systemAccountService.createSystemAccount(accountDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(systemAccountMapper.toDTO(createdAccount));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<SystemAccountDTO> updateAccount(@PathVariable Long id, @RequestBody SystemAccountDTO accountDTO) {
		accountDTO.setAccountId(id);
		// Only encode password if it's being changed (not already encoded)
		if (accountDTO.getAccountPassword() != null && !accountDTO.getAccountPassword().startsWith("$2")) {
			accountDTO.setAccountPassword(passwordEncoder.encode(accountDTO.getAccountPassword()));
		}
		SystemAccount updatedAccount = systemAccountService.updateSystemAccount(accountDTO);
		if (updatedAccount != null) {
			return ResponseEntity.ok(systemAccountMapper.toDTO(updatedAccount));
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
		if (systemAccountService.deleteSystemAccountById(id)) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
