package com.michael.chapter10_demo.controllers;

import com.michael.chapter10_demo.modes.Product;
import com.michael.chapter10_demo.services.ProductServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
	private final ProductServiceImpl productService;
	
	public ProductController(ProductServiceImpl productService) {
		this.productService = productService;
	}
	
	@GetMapping
	public List<Product> getAllProducts(){
		return productService.getAllProducts();
		
	}
	@PostMapping
	public Product saveProduct(@RequestBody Product product){
		return productService.saveProduct(product);
	}
	
	@PutMapping
	public Optional<Product>	updateProduct(@RequestBody Product product){
		return productService.updateProduct(product);
	}
	
	@DeleteMapping("/{id}")
	public String deleteProduct(@PathVariable Long id) {
		return productService.deleteProduct(id);
	
	}
	
	
}
