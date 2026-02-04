package com.michael.a2nguyenvanan18d04.services.impl;

import com.michael.a2nguyenvanan18d04.dto.CategoryDTO;
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
		return  categoryRepository.findAll();
	}
	@Override
	public Optional<Category> getCategoryById(Long id) {
		return categoryRepository.findById(id);
	}
	@Override
	public Category createCategory(CategoryDTO categoryDTO) {
		Category category = new Category();
		category.setCategoryName(categoryDTO.getCategoryName());
		category.setCategoryDescription(categoryDTO.getCategoryDescription());
		category.setIsActive(categoryDTO.getIsActive());
		
		// Set parent category if provided
		if (categoryDTO.getParentCategoryId() != null) {
			Optional<Category> parentCategory = categoryRepository.findById(categoryDTO.getParentCategoryId());
			parentCategory.ifPresent(category::setParentCategory);
		}
		
		return categoryRepository.save(category);
	}
	@Override
	public Category updateCategory(CategoryDTO categoryDTO) {
		if (categoryRepository.existsById(categoryDTO.getCategoryId())) {
			Category category = categoryRepository.findById(categoryDTO.getCategoryId()).orElse(null);
			if (category != null) {
				category.setCategoryName(categoryDTO.getCategoryName());
				category.setCategoryDescription(categoryDTO.getCategoryDescription());
				category.setIsActive(categoryDTO.getIsActive());
				
				// Update parent category if provided
				if (categoryDTO.getParentCategoryId() != null) {
					Optional<Category> parentCategory = categoryRepository.findById(categoryDTO.getParentCategoryId());
					parentCategory.ifPresent(category::setParentCategory);
				}
				
				return categoryRepository.save(category);
			}
		}
		return null;
	}
	@Override
	public boolean deleteCategoryById(Long id) {
		if (categoryRepository.existsById(id)) {
			Category category = categoryRepository.findById(id).orElse(null);
			// Cannot delete if category has associated news articles
			if (category != null && !category.getNewsArticles().isEmpty()) {
				return false;
			}
			categoryRepository.deleteById(id);
			return true;
		}
		return false;
	}
}
