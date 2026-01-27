package com.michael.chapter10_demo.services;

import com.michael.chapter10_demo.modes.Product;

import java.util.List;
import java.util.Optional;

public interface IProductService {
	List<Product> getAllProducts();
	
	Product saveProduct(Product product);
	
	 Optional<Product> getProductById(Long id);
	
	 List<Product> search(String name);
	
	 String deleteProduct(Long id);
	
	 Optional<Product> updateProduct(Product product);
	
}
