package com.michael.a2nguyenvanan18d04.controller;

import com.michael.a2nguyenvanan18d04.dto.CategoryDTO;
import com.michael.a2nguyenvanan18d04.dto.CategoryMapper;
import com.michael.a2nguyenvanan18d04.models.Category;
import com.michael.a2nguyenvanan18d04.services.interfaces.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	private final CategoryService categoryService;
	private final CategoryMapper categoryMapper;
	
	public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper){
		this.categoryService = categoryService;
		this.categoryMapper = categoryMapper;
	}
	
	
	        @RequestMapping("")
	        public ResponseEntity<List<CategoryDTO>> getAllCategories(){
	                List<Category> categories = categoryService.getAllCategories();
	                List<CategoryDTO> dtos = categories.stream()
	                        .map(categoryMapper::toDTO)
	                        .collect(Collectors.toList());
	                return ResponseEntity.ok(dtos);
	        }
	
	        @GetMapping("/{id}")
	        public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
	                return categoryService.getCategoryById(id)
	                                .map(categoryMapper::toDTO)
	                                .map(ResponseEntity::ok)
	                                .orElse(ResponseEntity.notFound().build());
	        }
	
	        @PostMapping("")
	        public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
	                Category category = categoryService.createCategory(categoryDTO);
	                if (category != null) {
	                        return ResponseEntity.status(HttpStatus.CREATED).body(categoryMapper.toDTO(category));
	                }
	                return ResponseEntity.badRequest().build();
	        }
	
	        @PutMapping("/{id}")
	                public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
	                        categoryDTO.setCategoryId(id);
	                        Category category = categoryService.updateCategory(categoryDTO);
	                        if (category != null) {
	                                return ResponseEntity.ok(categoryMapper.toDTO(category));
	                        }
	                        return ResponseEntity.notFound().build();
	                }	
	        @DeleteMapping("/{id}")
	        public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
	                if (categoryService.deleteCategoryById(id)) {
	                        return ResponseEntity.noContent().build();
	                }
	                return ResponseEntity.notFound().build();
	        }	
}
