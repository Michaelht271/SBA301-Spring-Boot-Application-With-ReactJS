package com.michael.lab4.controllers;

import com.michael.lab4.models.Employee;
import com.michael.lab4.services.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
	
	private final EmployeeService employeeService;
	public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}
	
	@GetMapping
	public Page<Employee> getEmployees(Pageable pageable) {
		return employeeService.getAllEmployees(pageable);
	}
	
	@PostMapping
	public Optional<Employee> createEmployee(@RequestBody Employee employee) {
		return employeeService.createEmployee(employee);
	}
	
	@PutMapping()
	public Optional<Employee> updateEmployee(@RequestBody Employee employee) {
		return employeeService.updateEmployee(employee);
	}
	
	@DeleteMapping("/{id}")
	public String deleteEmployee(@PathVariable String id) {
		return employeeService.deleteEmployee(id);
	}
}
