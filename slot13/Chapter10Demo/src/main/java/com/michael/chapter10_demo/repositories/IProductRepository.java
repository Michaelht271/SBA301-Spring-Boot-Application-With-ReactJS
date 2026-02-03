package com.michael.chapter10_demo.repositories;

import com.michael.chapter10_demo.modes.Product;

import java.util.List;
import java.util.Optional;

public interface IProductRepository {
	public List<Product> getAllProducts();
	
	public Optional<Product> findById(int id);
	
	public List<Product> search(String name);
	
	public Boolean save(Product product);
	public String delete(Long productId);
	
	public Optional<Product> update(Product product);
	
}
