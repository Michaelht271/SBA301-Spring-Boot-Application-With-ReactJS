package com.michael.lab4.models;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data

public class Employee {
	private String employeeId;
	private String name;
	private String description;
	private double salary;
	
}
