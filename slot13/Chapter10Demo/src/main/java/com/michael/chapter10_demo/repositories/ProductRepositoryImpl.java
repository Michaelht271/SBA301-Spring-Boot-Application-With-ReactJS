package com.michael.chapter10_demo.repositories;

import com.michael.chapter10_demo.modes.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepositoryImpl implements IProductRepository{
	private static  List<Product> products = new ArrayList<>(List.of(
			new Product(1L, "product 1", 10, 10.0),
			new Product(2L, "product 2", 10, 10.0),
			new Product(3L, "product 3", 10, 10.0)
	) );
	@Override
	public List<Product> getAllProducts() {
		return products;
	}
	@Override
	public Optional<Product> findById(int id) {
		return  products.stream().filter(product -> product.getId() == id).findFirst();
	}
	@Override
	public List<Product> search(String name) {
		return  products.stream().filter(product -> product.getName().contains(name)).toList();
	}
	@Override
	public Boolean save(Product product) {
		
		return products.add(product);
		
	}
	@Override
	public String delete(Long productId) {
		products.removeIf(product -> product.getId() == productId);
		return "Remove Success";
	}
	@Override
	public Optional<Product> update(Product product) {
		return findById(product.getId().intValue())
				.map(p -> {
					p.setName(product.getName());
					p.setPrice(product.getPrice());
					p.setQuantity(product.getQuantity());
					return p;
				});
	}

}
