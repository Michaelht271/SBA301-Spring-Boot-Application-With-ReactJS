package com.michael.backend.services.impl;

import com.michael.backend.pojo.Category;
import com.michael.backend.repositories.CategoryRepository;
import com.michael.backend.services.interfaces.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {
	private final CategoryRepository categoryRepository;
	
	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}
	
	@Override
	public void save(Category category) {
		categoryRepository.save(category);
	}
	@Override
	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}
}
