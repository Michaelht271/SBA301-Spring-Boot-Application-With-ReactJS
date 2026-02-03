package com.michael.a2nguyenvanan18d04.services.impl;

import com.michael.a2nguyenvanan18d04.models.Category;
import com.michael.a2nguyenvanan18d04.repositories.CategoryRepository;
import com.michael.a2nguyenvanan18d04.services.interfaces.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
	private final CategoryRepository categoryRepository;
	
	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}
	
	@Override
	public List<Category> getAllCategories() {
		return List.of();
	}
	@Override
	public Optional<Category> getCategoryById(Long id) {
		return Optional.empty();
	}
	@Override
	public boolean createCategory(Category category) {
		return false;
	}
	@Override
	public boolean updateCategory(Category category) {
		return false;
	}
	@Override
	public boolean deleteCategoryById(Long id) {
		return false;
	}
}
