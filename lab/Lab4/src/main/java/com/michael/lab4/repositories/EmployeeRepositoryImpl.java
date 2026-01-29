package com.michael.lab4.repositories;

import com.michael.lab4.models.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Repository
public  class EmployeeRepositoryImpl implements EmployeeRepository {
	
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
	public List<Employee> getAllEmployees() {
		return employees;
	}
	@Override
	public Optional<Employee> getEmployee() {
		return Optional.empty();
	}
	@Override
	public Optional<Employee> getEmployeeByEmployeeId(String id) {
		return employees.stream().filter(employee ->id.equals(employee.getEmployeeId())).findFirst();
	}
	@Override
	public Optional<Employee> updateEmployee(Employee employee) {
		Optional<Employee> existEmployee = getEmployeeByEmployeeId(employee.getEmployeeId());
		if(existEmployee.isEmpty()) {
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
		if(existEmployee.isEmpty()) {
			return "Meo co de removed";
		}
		employees.remove(existEmployee.get());
		return "Removed";
	}
	@Override
	public Optional<Employee> createEmployee(Employee employee) {
		Optional<Employee> existEmployee = getEmployeeByEmployeeId(employee.getEmployeeId());
		if(existEmployee.isEmpty()) {
			employees.add(employee);
			return Optional.of(employee);
		}
		
		return Optional.empty();
		
	}

	
	private Comparator<Employee> buildComparator(Sort sort) {
		
		Comparator<Employee> comparator = null;
		
		for (Sort.Order order : sort) {
			Comparator<Employee> fieldComparator = Comparator.comparing(emp -> {
				try {
					Field field = Employee.class.getDeclaredField(order.getProperty());
					field.setAccessible(true);
					return (Comparable) field.get(emp);
				} catch (Exception e) {
					throw new RuntimeException("Invalid sort field: " + order.getProperty(), e);
				}
			});
			
			if (order.getDirection() == Sort.Direction.DESC) {
				fieldComparator = fieldComparator.reversed();
			}
			
			comparator = (comparator == null)
					? fieldComparator
					: comparator.thenComparing(fieldComparator);
		}
		
		return comparator;
	}

	
	public Page<Employee> findAll(int page, int size, Sort sort) {
		
		List<Employee> data = new ArrayList<>(employees);
		
		// sort
		if (sort != null && sort.isSorted()) {
			data.sort(buildComparator(sort));
		}
		
		int total = data.size();
		int from = page * size;
		int to = Math.min(from + size, total);
		
		List<Employee> content =
				from >= total ? List.of() : data.subList(from, to);
		
		return new PageImpl<>(
				content,
				PageRequest.of(page, size, sort),
				total
		);
	}
	
	
	
}
