package com.michael.a3nguyenvanan18d04.services.impl;

import com.michael.a3nguyenvanan18d04.entites.Customer;
import com.michael.a3nguyenvanan18d04.repository.CustomerRepository;
import com.michael.a3nguyenvanan18d04.services.interfaces.CustomerService;
import jakarta.annotation.Nonnull;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CustomerServiceImpl implements CustomerService, UserDetailsService {
	
	private final CustomerRepository customerRepository;
	
	public CustomerServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(@Nonnull String username) throws UsernameNotFoundException {
		Customer customer = customerRepository.findByEmailAddress(username);
		if (customer == null) {
			throw new UsernameNotFoundException("User not found");
		}
		return User.builder().username(customer.getEmailAddress()).password(customer.getPassword()).roles(customer.getRoles().toString()).build();
	}
	@Override
	public List<Customer> getCustomerServices() {
		return customerRepository.findAll();
	}
	@Override
	public Customer getCustomerById(Long id) {
		return customerRepository.findById(id).orElse(null);
	}
	@Override
	public Customer createCustomer(Customer customer) {
		return customerRepository.save(customer);
	}
	@Override
	public Customer updateCustomer(Long id, Customer customer) {
		return customerRepository.save(customer);
	}
	@Override
	public void deleteCustomer(Long id) {
		customerRepository.deleteById(id);
	}
}
