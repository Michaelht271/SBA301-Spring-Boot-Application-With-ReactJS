package com.michael.chapter10_demo.services;

import com.michael.chapter10_demo.modes.Product;
import com.michael.chapter10_demo.repositories.ProductRepositoryImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService{
	
	private final ProductRepositoryImpl productRepository ;
	
	public ProductServiceImpl(ProductRepositoryImpl productRepository) {
		this.productRepository = productRepository;
	}
	
	@Override
	public List<Product> getAllProducts() {
		return productRepository.getAllProducts();
	}
	@Override
	public Product saveProduct(Product product) {
		Optional<Product> check = getProductById(product.getId());
		if(check != null) {
			return null;
		}
		return productRepository.save(product) ? product : null ;
	}
	@Override
	public Optional<Product> getProductById(Long id) {
		return productRepository.findById(id.intValue());
	}
	@Override
	public List<Product> search(String name) {
		return productRepository.search(name);
	}
	@Override
	public String deleteProduct(Long id) {
		return productRepository.delete(id);
	}
	@Override
	public Optional<Product> updateProduct(Product product) {
		return productRepository.update(product);
	}
}
