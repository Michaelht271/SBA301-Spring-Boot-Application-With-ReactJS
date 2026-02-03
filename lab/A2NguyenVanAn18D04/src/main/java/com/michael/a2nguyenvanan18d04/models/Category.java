package com.michael.a2nguyenvanan18d04.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Entity
@Table(name = "Category")
@NoArgsConstructor
@Getter
@Setter
@Data
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long categoryId;

	@Column(name = "CategoryName")
	private String categoryName;

	@Column(name = "CategoryDesciption")
	private String categoryDescription;

	@ManyToOne
	@JoinColumn(name = "ParentCategoryId")
	private Category parentCategory ;
	
	@OneToMany(mappedBy = "parentCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private ArrayList<Category> childCategories = new ArrayList<>();
	

	@Column(name = "IsActive")
	private Boolean isActive;
	
	public Category(String categoryName, String categoryDescription, Category parentCategory, Boolean isActive) {
		this.categoryName = categoryName;
		this.categoryDescription = categoryDescription;
		this.isActive = isActive;
		this.parentCategory= parentCategory;
	}
	
	public void addChildCategory(Category childCategory) {
		this.childCategories.add(childCategory);
		childCategory.setParentCategory(this);
	}
	
	public void removeChildCategory(Category childCategory) {
		this.childCategories.remove(childCategory);
		childCategory.setParentCategory(null);
	}
}

