package com.michael.pe_sba301_sp25_be_nguyenvanan.utils;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.AccountMember;
import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Car;
import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Country;
import com.michael.pe_sba301_sp25_be_nguyenvanan.enums.Role;

import com.michael.pe_sba301_sp25_be_nguyenvanan.services.impl.CountryServiceImpl;
import org.springframework.context.annotation.*;
import com.michael.pe_sba301_sp25_be_nguyenvanan.services.impl.AccountMemberServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
	@Bean
	public CommandLineRunner commandLineRunner(AccountMemberServiceImpl accountMemberService, PasswordEncoder passwordEncoder, CountryServiceImpl countryService) {
		return args -> {
			AccountMember admin = AccountMember.builder()
			                                           .emailAddress("Admin@test.com")
			                                           .memberPassword(passwordEncoder.encode("Admin@123"))
			                                           .role(Role.ADMIN).build();
			accountMemberService.createAccountMember(admin);
			
			AccountMember  staff = AccountMember.builder()
					.emailAddress("staff@test.com")
					.memberPassword(passwordEncoder.encode("Staff@123"))
					.role(Role.STAFF).build();
			accountMemberService.createAccountMember(staff);
			
			AccountMember customer = AccountMember.builder()
			                                      .emailAddress("customer@test.com")
					.memberPassword("Customer@123")
					.role(Role.MEMBER).build();
			accountMemberService.createAccountMember(customer);
			
			Country vietnamese = new Country("Vietnam");
			Country Japan = new Country("Japan");
			
			Car vios = Car.builder().carName("Vios").unitPrice(600_000_000).unitsInStock(10L).build();
			Japan.addCar(vios);
			countryService.createCountry(Japan);
		};
	}
}
