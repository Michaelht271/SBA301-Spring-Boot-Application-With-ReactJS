package com.michael.lab6.services;

import com.michael.lab6.entities.User;
import com.michael.lab6.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
	private final UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.getUserByEmail(username);
		
		// Additional useful methods:
	}
	
	public List<User> getAllUser() {
		return userRepository.findAll();
	}
	
	public User createUser(User user) {
		// Add validation, password encoding, etc.
		return userRepository.save(user);
	}
	
	public User findById(Long id) {
		return userRepository.findById(id)
		                     .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
	}
	
	public User findByEmail(String email) {
		return userRepository.getUserByEmail(email);
		             }
	
	public boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}
}