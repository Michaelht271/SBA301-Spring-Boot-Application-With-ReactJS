package com.michael.a2nguyenvanan18d04.services.interfaces;

import com.michael.a2nguyenvanan18d04.models.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
	
	List<Category> getAllCategories();
	Optional<Category> getCategoryById(Long id);
	boolean createCategory(Category category);
	boolean updateCategory(Category  category);
	boolean deleteCategoryById(Long id);
}
