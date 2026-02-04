package com.michael.backend.services.interfaces;

import com.michael.backend.pojo.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
	void save(Category category);
	List<Category> getAllCategory();
	
}
