package com.michael.backend.controllers;

import com.michael.backend.pojo.Category;
import com.michael.backend.services.impl.CategoryServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {
	
	private final CategoryServiceImpl categoryService;
	
	public CategoryController(CategoryServiceImpl categoryService) {
		this.categoryService = categoryService;
	}
	
	@GetMapping(value = {"/", ""})
	public ResponseEntity<List<Category>> fetchAll() {
		return ResponseEntity.ok(categoryService.getAllCategory());
	}
}
