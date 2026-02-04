package com.michael.a2nguyenvanan18d04.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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



	@Column(name = "IsActive")
	private Boolean isActive;
	
	@ManyToOne
	@JoinColumn(name = "ParentCategoryId")
	
	private Category parentCategory ;
	
	@OneToMany(mappedBy = "parentCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Category> childCategories = new ArrayList<>();
	
	@OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<NewsArticle> newsArticles = new ArrayList<>();
	
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
	
	
	public void addNewsArticle(NewsArticle newsArticle) {
		this.newsArticles.add(newsArticle);
		newsArticle.setCategory(this);
	}
	
	public void removedNewsArticle(NewsArticle newsArticle) {
		this.newsArticles.remove(newsArticle);
		newsArticle.setCategory(null);
	}
}

