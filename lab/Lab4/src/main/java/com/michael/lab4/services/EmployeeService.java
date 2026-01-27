package com.michael.lab4.services;

import com.michael.lab4.models.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
	List<Employee> getAllEmployees();
	
	Optional<Employee> getEmployee(String id);

	
	Optional<Employee> updateEmployee(Employee employee);
	
	String  deleteEmployee(String id);
	
	Optional<Employee> createEmployee(Employee employee);
}
