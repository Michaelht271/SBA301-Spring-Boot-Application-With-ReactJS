package com.michael.lab4.repositories;

import com.michael.lab4.models.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Repository
public class EmployeeRepositoryImpl implements EmployeeRepository {
	
	private final static List<Employee> employees = new ArrayList<Employee>(
			List.of(
					new Employee("EMP01", "Steven Paris", "Technical Manager", 3000),
					new Employee("EMP02", "John Lemon", "Developer", 1000),
					new Employee("EMP03", "Steven Paris", "Tester", 3000),
					new Employee("EMP04", "David William", "Accountant", 1000),
					new Employee("EMP05", "Christopher Robert", "HR Manager", 3000),
					new Employee("EMP06", "George Ronald", "Developer", 1000)
			)
	);
	
	@Override
	public List<Employee> findAll() {
		return employees;
	}
	
	@Override
	public Optional<Employee> getEmployeeByEmployeeId(String id) {
		return employees.stream().filter(employee -> id.equals(employee.getEmployeeId())).findFirst();
	}
	
	@Override
	public Optional<Employee> updateEmployee(Employee employee) {
		if (employee == null) {
			return Optional.empty();
		}
		Optional<Employee> existEmployee = getEmployeeByEmployeeId(employee.getEmployeeId());
		if (existEmployee.isEmpty()) {
			return Optional.empty();
		}
		return existEmployee.map(emp -> {
			                         emp.setName(employee.getName());
			                         emp.setDescription(employee.getDescription());
			                         emp.setSalary(employee.getSalary());
			                         return emp;
		                         }
		);
	}
	
	@Override
	public String deleteEmployee(String id) {
		Optional<Employee> existEmployee = getEmployeeByEmployeeId(id);
		if (existEmployee.isEmpty()) {
			return "Meo co de removed";
		}
		employees.remove(existEmployee.get());
		return "Removed";
	}
	@Override
	public Optional<Employee> createEmployee(Employee employee) {
		Optional<Employee> existEmployee = getEmployeeByEmployeeId(employee.getEmployeeId());
		if (existEmployee.isEmpty()) {
			employees.add(employee);
			return Optional.of(employee);
		}
		
		return Optional.empty();
		
	}
	
	@Override
	public Iterable<Employee> findAll(Sort sort) {
		List<Employee> sortedEmployees = new ArrayList<>(employees);
		
		Comparator<Employee> comparator = null;
		
		for (Sort.Order order : sort) {
			Comparator<Employee> currentComparator = null;
			switch (order.getProperty()) {
				case "employeeId":
					currentComparator = Comparator.comparing(Employee::getEmployeeId);
					break;
				case "name":
					currentComparator = Comparator.comparing(Employee::getName);
					break;
				case "salary":
					currentComparator = Comparator.comparing(Employee::getSalary);
					break;
				default:
					// Optionally handle unknown properties, e.g., by throwing an exception or ignoring
					throw new IllegalArgumentException("Cannot sort by unknown property: " + order.getProperty());
			}
			
			if (order.isDescending()) {
				currentComparator = currentComparator.reversed();
			}
			
			if (comparator == null) {
				comparator = currentComparator;
			} else {
				comparator = comparator.thenComparing(currentComparator);
			}
		}
		
		if (comparator != null) {
			sortedEmployees.sort(comparator);
		}
		
		return sortedEmployees;
	}
	@Override
	public Page<Employee> findAll(Pageable pageable) {
		List<Employee> allEmployees = (List<Employee>) findAll(pageable.getSort());
		
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), allEmployees.size());
		
		List<Employee> pageContent = new ArrayList<>();
		if (start <= end) {
			pageContent = allEmployees.subList(start, end);
		}
		
		return new PageImpl<>(pageContent, pageable, allEmployees.size());
	}
}
