package com.michael.a3nguyenvanan18d04.controllers;

import com.michael.a3nguyenvanan18d04.entites.Customer;
import com.michael.a3nguyenvanan18d04.services.interfaces.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customers")

public class CustomerController {
	private final CustomerService customerService;
	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}
	
	@GetMapping("")
	public ResponseEntity<Object> getAllCustomers(){
		return ResponseEntity.ok(customerService.getCustomers());
	}
	
	@PostMapping("")
	public ResponseEntity<Object> addCustomer(@RequestBody Customer customer) {
		return ResponseEntity.ok(customerService.createCustomer(customer));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> getCustomerById(@PathVariable Long id) {
		return ResponseEntity.ok(customerService.getCustomerById(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> updateCustomer(@PathVariable Long id,@RequestBody Customer customer) {
		if(customerService.updateCustomer(id, customer) != null) {
			return ResponseEntity.ok(customerService.getCustomers());
		}
	    return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteCustomer(@PathVariable Long id) {
		customerService.deleteCustomer(id);
		return ResponseEntity.ok("Customer deleted");
	}

}
