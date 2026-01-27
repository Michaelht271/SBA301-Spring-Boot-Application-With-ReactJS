package com.michael.lab4.controllers;

import com.michael.lab4.models.Employee;
import com.michael.lab4.services.EmployeeService;
import com.michael.lab4.services.EmployeeServicesImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
	
	private final EmployeeService employeeService;
	public EmployeeController(EmployeeServicesImpl employeeService) {
		this.employeeService = employeeService;
		
	}
	
	
	@GetMapping
	public List<Employee> getEmployees() {
		return employeeService.getAllEmployees();
	}
	
	@PostMapping
	public Optional<Employee> createEmployee(Employee employee) {
		return employeeService.createEmployee(employee);
	}
	
	@PutMapping("/{id}")
	public Optional<Employee> updateEmployee(@PathVariable String id, Employee employee) {
		return employeeService.updateEmployee(employee);
	}
	
	@DeleteMapping("/{id}")
	public String deleteEmployee(@PathVariable String id) {
		return employeeService.deleteEmployee(id);
	}
}
