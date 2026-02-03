package com.michael.chapter10_demo.modes;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Product {
	private Long id;
	private String name;
	private int quantity;
	private double price;
}
