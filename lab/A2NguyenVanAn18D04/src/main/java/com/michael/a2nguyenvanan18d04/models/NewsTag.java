package com.michael.a2nguyenvanan18d04.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "NewsTag")
public class NewsTag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long newsTagId;
	
	@ManyToOne
	@JoinColumn(name = "TagId", nullable = false)
	private Tag tag;
	
	@ManyToOne
	@JoinColumn(name = "NewsArticleId", nullable = false)
	private NewsArticle newsArticle;
	
	
}
