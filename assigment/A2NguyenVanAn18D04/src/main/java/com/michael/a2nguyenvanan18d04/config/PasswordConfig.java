package com.michael.a2nguyenvanan18d04.config;


import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {
	
	/**
	 * Cung cấp Bean để mã hóa mật khẩu.
	 * <p>
	 * Sử dụng BCrypt, một thuật toán mã hóa mật khẩu mạnh và phổ biến.
	 * Strength (độ phức tạp) được đặt là 12 để tăng cường bảo mật so với giá trị mặc định (10).
	 *
	 * @return một instance của PasswordEncoder (cụ thể là BCryptPasswordEncoder).
	 */
	 
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}
	

}
