package com.michael.pe_sba301_sp25_be_nguyenvanan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PeSba301Sp25BeNguyenVanAnApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(PeSba301Sp25BeNguyenVanAnApplication.class, args);
	}
	
}
