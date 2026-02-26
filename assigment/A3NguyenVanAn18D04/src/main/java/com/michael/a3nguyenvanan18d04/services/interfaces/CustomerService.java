package com.michael.a3nguyenvanan18d04.services.interfaces;

import com.michael.a3nguyenvanan18d04.entites.Customer;

import java.util.List;

public interface CustomerService {
	List<Customer> getCustomerServices();
	
	Customer getCustomerById(Long id);
	
	Customer createCustomer(Customer customer);
	
	Customer updateCustomer(Long id, Customer customer);
	
	void deleteCustomer(Long id);
}
