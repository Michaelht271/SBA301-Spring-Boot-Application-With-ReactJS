package com.michael.pe_sba301_sp25_be_nguyenvanan.services.impl;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.AccountMember;
import com.michael.pe_sba301_sp25_be_nguyenvanan.repositories.AccountMemberRepository;
import com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces.AccountMemberService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountMemberServiceImpl implements AccountMemberService, UserDetailsService {
	
	private final AccountMemberRepository accountMemberRepository;
	

	@Override
	public List<AccountMember> getAllAccountMembers() {
		return accountMemberRepository.findAll();
	}
	@Override
	public AccountMember getAccountMemberById(Long memberId) {
		return accountMemberRepository.findById(memberId).orElse(null);
	}
	@Override
	public AccountMember createAccountMember(AccountMember accountMember) {
		return accountMemberRepository.save(accountMember);
	}
	@Override
	public AccountMember updateAccountMember(Long memberId, AccountMember updatedAccountMember) {
		return accountMemberRepository.save(updatedAccountMember);
	}
	@Override
	public void deleteAccountMember(Long memberId) {
	accountMemberRepository.deleteById(memberId);
	}
	@Override
	public @Nonnull UserDetails loadUserByUsername(@Nonnull String username) throws UsernameNotFoundException {
		return accountMemberRepository.findAccountMembersByEmailAddress(username);
	
	}
}

