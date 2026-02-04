package com.michael.a2nguyenvanan18d04.services.interfaces;

import com.michael.a2nguyenvanan18d04.dto.NewsArticleDTO;
import com.michael.a2nguyenvanan18d04.models.NewsArticle;

import java.util.List;
import java.util.Optional;

public interface NewsArticleServices {
	
	List<NewsArticle> getAllNewsArticles();
	Optional<NewsArticle> getNewsArticlesById(Long id);
	NewsArticle createNewsArticles(NewsArticleDTO newsArticleDTO);
	NewsArticle updateNewsArticles(NewsArticleDTO newsArticleDTO);
	boolean deleteNewsArticlesById(Long id);
}
