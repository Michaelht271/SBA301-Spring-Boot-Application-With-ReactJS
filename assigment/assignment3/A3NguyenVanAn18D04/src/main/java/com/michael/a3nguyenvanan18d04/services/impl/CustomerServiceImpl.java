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
	public @Nonnull UserDetails loadUserByUsername(@Nonnull String username) throws UsernameNotFoundException {
		Customer customer = customerRepository.findByEmailAddress(username);
		if (customer == null) {
			throw new UsernameNotFoundException("User not found");
		}
		return User.builder().username(customer.getEmailAddress()).password(customer.getPassword()).roles(customer.getRoles().toString()).build();
	}
	@Override
	public List<Customer> getCustomers() {
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
		
		if (customer == null) {
			return null;
		}
		Customer existingCustomer = customerRepository.getReferenceById(id);
		existingCustomer.setCustomerFullName(customer.getCustomerFullName());
		existingCustomer.setTelephone(customer.getTelephone());
		existingCustomer.setEmailAddress(customer.getEmailAddress());
		existingCustomer.setCustomerBirthday(customer.getCustomerBirthday());
		existingCustomer.setCustomerStatus(customer.getCustomerStatus());
		existingCustomer.setPassword(customer.getPassword());

		return customerRepository.save(existingCustomer);
	}
	@Override
	public void deleteCustomer(Long id) {
		customerRepository.deleteById(id);
	}
	@Override
	public Customer getCustomerByEmail(String email) {
		return customerRepository.findByEmailAddress(email);
	}
}
