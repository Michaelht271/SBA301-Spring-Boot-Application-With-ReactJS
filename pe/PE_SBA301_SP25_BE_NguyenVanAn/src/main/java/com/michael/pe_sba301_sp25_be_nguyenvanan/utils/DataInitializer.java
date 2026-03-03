package com.michael.pe_sba301_sp25_be_nguyenvanan.utils;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.AccountMember;
import com.michael.pe_sba301_sp25_be_nguyenvanan.enums.Role;

import org.springframework.context.annotation.*;
import com.michael.pe_sba301_sp25_be_nguyenvanan.services.impl.AccountMemberServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
	@Bean
	public CommandLineRunner commandLineRunner(AccountMemberServiceImpl accountMemberService, PasswordEncoder passwordEncoder) {
		return args -> {
			AccountMember accountMember = AccountMember.builder()
			                                           .emailAddress("Admin@test.com")
			                                           .memberPassword(passwordEncoder.encode("Admin@123"))
			                                           .role(Role.ADMIN).build();
			accountMemberService.createAccountMember(accountMember);
		};
	}
}
