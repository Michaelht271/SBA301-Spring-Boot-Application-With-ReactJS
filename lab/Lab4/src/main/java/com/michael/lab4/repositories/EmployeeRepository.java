package com.michael.lab4.repositories;

import com.michael.lab4.models.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository {
	
	List<Employee> getAllEmployees();
	
	Optional<Employee> getEmployee();
	
	Optional<Employee> getEmployeeByEmployeeId(String id);
	
	Optional<Employee> updateEmployee(Employee employee);
	
	String  deleteEmployee(String id);
	
	Optional<Employee> createEmployee(Employee employee);
	
}
