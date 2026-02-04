package com.michael.a2nguyenvanan18d04.dto;

import com.michael.a2nguyenvanan18d04.models.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryDTO toDTO(Category category) {
        if (category == null) {
            return null;
        }
        
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(category.getCategoryId());
        dto.setCategoryName(category.getCategoryName());
        dto.setCategoryDescription(category.getCategoryDescription());
        dto.setIsActive(category.getIsActive());
        dto.setParentCategoryId(category.getParentCategory() != null ? category.getParentCategory().getCategoryId() : null);
        
        return dto;
    }

    public Category toEntity(CategoryDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Category category = new Category();
        category.setCategoryId(dto.getCategoryId());
        category.setCategoryName(dto.getCategoryName());
        category.setCategoryDescription(dto.getCategoryDescription());
        category.setIsActive(dto.getIsActive());
        // Note: parentCategory needs to be set separately by service layer
        
        return category;
    }
}
