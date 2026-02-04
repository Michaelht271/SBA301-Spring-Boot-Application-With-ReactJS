package com.michael.a2nguyenvanan18d04.services.interfaces;

import com.michael.a2nguyenvanan18d04.dto.CategoryDTO;
import com.michael.a2nguyenvanan18d04.models.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
	
	List<Category> getAllCategories();
	Optional<Category> getCategoryById(Long id);
	Category createCategory(CategoryDTO categoryDTO);
	Category updateCategory(CategoryDTO categoryDTO);
	boolean deleteCategoryById(Long id);
}
