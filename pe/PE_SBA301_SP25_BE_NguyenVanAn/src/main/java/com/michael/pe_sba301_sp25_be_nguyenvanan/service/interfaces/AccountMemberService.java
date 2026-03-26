package com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.AccountMember;

import java.util.List;

public interface   AccountMemberService {
	List<AccountMember> getAllAccountMembers();
	
	AccountMember getAccountMemberById(Long memberId);
	
	AccountMember createAccountMember(AccountMember accountMember);
	
	AccountMember updateAccountMember(Long memberId, AccountMember updatedAccountMember);
	
	void deleteAccountMember(Long memberId);
}
