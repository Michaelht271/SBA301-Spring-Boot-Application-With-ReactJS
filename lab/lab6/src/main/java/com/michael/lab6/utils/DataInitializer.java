package com.michael.lab6.utils;

import com.michael.lab6.entities.Role;
import com.michael.lab6.entities.User;
import com.michael.lab6.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer {
	
	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	
	public DataInitializer(PasswordEncoder passwordEncoder, UserRepository userRepository) {
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
	}
	
	@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {
			// Tạo admin user nếu chưa tồn tại
			if (!userRepository.existsByEmail("admin@example.com")) {
				User admin = new User();
				admin.setEmail("admin@example.com");
				admin.setFullName("Administrator");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setRole(Role.ADMIN);
				userRepository.save(admin);
				System.out.println("Admin user created successfully!");
			}
			
			// Tạo regular user nếu chưa tồn tại
			if (!userRepository.existsByEmail("user@example.com")) {
				User user = new User();
				user.setEmail("user@example.com");
				user.setFullName("Regular User");
				user.setPassword(passwordEncoder.encode("user123"));
				user.setRole(Role.USER);
				userRepository.save(user);
				System.out.println("Regular user created successfully!");
			}
			
			System.out.println("Data initialization completed!");
		};
	}
}